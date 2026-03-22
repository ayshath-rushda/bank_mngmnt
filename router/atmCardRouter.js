import express from "express";
import { AtmCard } from "../models/AtmCard.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const atmCards = await AtmCard.find().populate("account");
    res.json(atmCards);
});

router.get("/:id", async (req, res) => {
    const atmCard = await AtmCard.findById(req.params.id).populate("account");
    res.json(atmCard);
});

router.post("/", async (req, res) => {
    const newAtmCard = await AtmCard.create(req.body);
    await newAtmCard.populate("account");
    res.json(newAtmCard);
});

router.put("/:id", async (req, res) => {
    const updateAtmCard = await AtmCard.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("account");
    res.json(updateAtmCard);
});

router.delete("/:id", async (req, res) => {
    const deleteAtmCard = await AtmCard.findByIdAndDelete(req.params.id).populate("account");
    res.json(deleteAtmCard);
});

export { router as atmCardRouter };
