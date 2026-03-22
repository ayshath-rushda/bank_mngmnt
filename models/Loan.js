import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({


    amount: {
        type: Number,
        min: 1,
        required: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);
export { Loan }