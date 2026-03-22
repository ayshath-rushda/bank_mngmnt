import mongoose from "mongoose";

const acntSchema = new mongoose.Schema({
    acno: String,
    balance: {
        type: Number,
        min: 0,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

const Account = mongoose.model("Account", acntSchema);
export { Account }