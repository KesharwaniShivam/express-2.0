import mongoose from "mongoose";

const formSchema = new mongoose.Schema({

    name: String,
    email: String, 
    password : String,

},{timestamps: true})

export const registerdata = mongoose.model("registerdata", formSchema);