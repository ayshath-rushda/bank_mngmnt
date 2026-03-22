import express from "express";
import { User } from "../models/User.js";
import { Account } from "../models/Account.js";
import { AtmCard } from "../models/AtmCard.js";
import { Loan } from "../models/Loan.js";
import { Transaction } from "../models/Transaction.js";

const router = express.Router();

const toPositiveNumber = (value) => {
    const numberValue = Number(value);
    if (!Number.isFinite(numberValue) || numberValue <= 0) {
        return null;
    }
    return numberValue;
};

const toViewData = (data) => JSON.parse(JSON.stringify(data));

router.get("/", async (req, res) => {
    const [usersCount, accountsCount, cardsCount, loansCount, transactionsCount] = await Promise.all([
        User.countDocuments(),
        Account.countDocuments(),
        AtmCard.countDocuments(),
        Loan.countDocuments(),
        Transaction.countDocuments(),
    ]);

    res.render("home", {
        title: "Bank Dashboard",
        stats: {
            usersCount,
            accountsCount,
            cardsCount,
            loansCount,
            transactionsCount,
        },
        message: req.query.message || "",
    });
});

router.get("/users", async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("users", {
        title: "Users",
        users: toViewData(users),
        message: req.query.message || "",
    });
});

router.post("/users", async (req, res) => {
    await User.create(req.body);
    res.redirect("/web/users?message=User%20created");
});

router.get("/accounts", async (req, res) => {
    const [accounts, users] = await Promise.all([
        Account.find().populate("user").sort({ createdAt: -1 }),
        User.find().sort({ name: 1 }),
    ]);

    res.render("accounts", {
        title: "Accounts",
        accounts: toViewData(accounts),
        users: toViewData(users),
        message: req.query.message || "",
    });
});

router.post("/accounts", async (req, res) => {
    await Account.create({
        acno: req.body.acno,
        user: req.body.user,
        balance: Number(req.body.balance || 0),
    });

    res.redirect("/web/accounts?message=Account%20created");
});

router.get("/atm-cards", async (req, res) => {
    const [atmCards, accounts] = await Promise.all([
        AtmCard.find().populate("account").sort({ createdAt: -1 }),
        Account.find().sort({ acno: 1 }),
    ]);

    res.render("atm-cards", {
        title: "ATM Cards",
        atmCards: toViewData(atmCards),
        accounts: toViewData(accounts),
        message: req.query.message || "",
    });
});

router.post("/atm-cards", async (req, res) => {
    await AtmCard.create(req.body);
    res.redirect("/web/atm-cards?message=ATM%20card%20created");
});

router.get("/loans", async (req, res) => {
    const [loans, accounts] = await Promise.all([
        Loan.find().populate("account").sort({ createdAt: -1 }),
        Account.find().sort({ acno: 1 }),
    ]);

    res.render("loans", {
        title: "Loans",
        loans: toViewData(loans),
        accounts: toViewData(accounts),
        message: req.query.message || "",
    });
});

router.post("/loans", async (req, res) => {
    const amount = toPositiveNumber(req.body.amount);
    if (!amount) {
        return res.redirect("/web/loans?message=Loan%20amount%20must%20be%20greater%20than%200");
    }

    const account = await Account.findById(req.body.account);
    if (!account) {
        return res.redirect("/web/loans?message=Account%20not%20found");
    }

    await Loan.create({
        account: req.body.account,
        amount,
        date: req.body.date,
    });

    await Account.findByIdAndUpdate(req.body.account, {
        $inc: { balance: amount },
    });

    return res.redirect("/web/loans?message=Loan%20created%20and%20balance%20updated");
});

router.get("/transactions", async (req, res) => {
    const [transactions, accounts] = await Promise.all([
        Transaction.find().populate("account").sort({ createdAt: -1 }),
        Account.find().sort({ acno: 1 }),
    ]);

    res.render("transactions", {
        title: "Transactions",
        transactions: toViewData(transactions),
        accounts: toViewData(accounts),
        message: req.query.message || "",
    });
});

router.post("/transactions", async (req, res) => {
    const amount = toPositiveNumber(req.body.amount);
    if (!amount) {
        return res.redirect("/web/transactions?message=Transaction%20amount%20must%20be%20greater%20than%200");
    }

    const account = await Account.findById(req.body.account);
    if (!account) {
        return res.redirect("/web/transactions?message=Account%20not%20found");
    }

    if (req.body.type === "withdrawal") {
        const hasBalance = await Account.findOneAndUpdate(
            {
                _id: req.body.account,
                balance: { $gte: amount },
            },
            {
                $inc: { balance: -amount },
            }
        );

        if (!hasBalance) {
            return res.redirect("/web/transactions?message=Insufficient%20balance%20for%20withdrawal");
        }
    }

    if (req.body.type === "deposit") {
        await Account.findByIdAndUpdate(req.body.account, {
            $inc: { balance: amount },
        });
    }

    await Transaction.create({
        account: req.body.account,
        amount,
        type: req.body.type,
        date: req.body.date,
    });

    return res.redirect("/web/transactions?message=Transaction%20saved%20and%20balance%20updated");
});

export { router as webRouter };
