import express from "express";
import path from "path";
import mongoose from "mongoose";

const app = express();
const port = 3000;

const pathloc = path.join(path.resolve(), "views");





app.get("/", (req, res)=>{
    res.send("hey")
    console.log(pathloc)
})

// we have to set engine
app.set("view engine" , "ejs")

app.get("/ejs", (req, res)=>{
    res.render("index", {msg : "hello from index.js"})
})

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})