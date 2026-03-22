import express from "express";
import { Loan } from "../models/Loan.js";
import { Account } from "../models/Account.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const loans = await Loan.find().populate("account");
    res.json(loans);
});

router.get("/:id", async (req, res) => {
    const loan = await Loan.findById(req.params.id).populate("account");
    res.json(loan);
});

router.post("/", async (req, res) => {
    const { account, amount } = req.body;

    const existingAccount = await Account.findById(account);
    if (!existingAccount) {
        return res.status(404).json({ message: "Account not found" });
    }

    const newLoan = await Loan.create(req.body);
    await Account.findByIdAndUpdate(account, {
        $inc: { balance: amount },
    });

    await newLoan.populate("account");
    res.json(newLoan);
});

router.put("/:id", async (req, res) => {
    const updateLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("account");
    res.json(updateLoan);
});

router.delete("/:id", async (req, res) => {
    const deleteLoan = await Loan.findByIdAndDelete(req.params.id).populate("account");
    res.json(deleteLoan);
});

export { router as loanRouter };
