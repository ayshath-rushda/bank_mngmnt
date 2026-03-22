import mongoose from "mongoose";

const atmcSchema = new mongoose.Schema({

    
    cardno: {
        type:String,
        required:true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    expDate:{
        type:Date,
    },
    cardType:{
        type:String,
        
        //"enum" constraint used for one value
        enum:["credit","debit"]
    }
}, { timestamps: true });

const AtmCard = mongoose.model("AtmCard",atmcSchema);
export {AtmCard}