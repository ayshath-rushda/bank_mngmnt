import mongoose from "mongoose";

const trnSchema = new mongoose.Schema({

    
    amount: {
        type: Number,
        min: 1,
        required:true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    date:{
        type:Date,
        default:Date.now
    },
    type:{
        type:String,
        
        //"enum" constraint used for one value
        enum:["withdrawal","deposit"]
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction",trnSchema);
export {Transaction}