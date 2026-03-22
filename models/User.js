import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    phone:String,
    dob:Date,
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export{User}