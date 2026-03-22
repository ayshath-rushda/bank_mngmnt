import express from "express";
import { Transaction } from "../models/Transaction.js";
import { Account } from "../models/Account.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const transactions = await Transaction.find().populate("account");
    res.json(transactions);
});

router.get("/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id).populate("account");
    res.json(transaction);
});

router.post("/", async (req, res) => {
    const { account, amount, type } = req.body;

    const existingAccount = await Account.findById(account);
    if (!existingAccount) {
        return res.status(404).json({ message: "Account not found" });
    }

    if (type === "deposit") {
        await Account.findByIdAndUpdate(account, {
            $inc: { balance: amount },
        });
    }

    if (type === "withdrawal") {
        const updatedAccount = await Account.findOneAndUpdate(
            {
                _id: account,
                balance: { $gte: amount },
            },
            {
                $inc: { balance: -amount },
            },
            {
                new: true,
            }
        );

        if (!updatedAccount) {
            return res.status(400).json({ message: "Insufficient account balance" });
        }
    }

    const newTransaction = await Transaction.create(req.body);
    await newTransaction.populate("account");
    res.json(newTransaction);
});

router.put("/:id", async (req, res) => {
    const updateTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("account");
    res.json(updateTransaction);
});

router.delete("/:id", async (req, res) => {
    const deleteTransaction = await Transaction.findByIdAndDelete(req.params.id).populate("account");
    res.json(deleteTransaction);
});

export { router as transactionRouter };
