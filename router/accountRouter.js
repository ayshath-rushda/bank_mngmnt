import express from "express";
import { Account } from "../models/Account.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const accounts = await Account.find().populate("user");
    res.json(accounts);
});

router.get("/:id", async (req, res) => {
    const account = await Account.findById(req.params.id).populate("user");
    res.json(account);
});

router.post("/", async (req, res) => {
    const newAccount = await Account.create(req.body);
    await newAccount.populate("user");
    res.json(newAccount);
});

router.put("/:id", async (req, res) => {
    const updateAccount = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("user");
    res.json(updateAccount);
});

router.delete("/:id", async (req, res) => {
    const deleteAccount = await Account.findByIdAndDelete(req.params.id).populate("user");
    res.json(deleteAccount);
});

export { router as accountRouter };
