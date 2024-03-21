import mongoose from "mongoose";
import { config } from "dotenv";

config();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: "backend",
}).then(() => console.log("Database connected")).catch((e) => console.log(e))

const formSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,

}, { timestamps: true })

export const registerdata = mongoose.model("registerdata", formSchema);