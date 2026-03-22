import express from "express";
import { User } from "../models/User.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);

});

router.post("/", async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);


});

router.put("/:id", async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updateUser);

});

router.delete("/:id", async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.json(deleteUser);
});

export { router as userRouter };
