import express, { urlencoded } from "express";
import path from "path";
import { registerdata } from "./form.model.js";
import { config } from "dotenv";
import mongoose from "mongoose";


const app = express();
// const port = 3000;

config();

mongoose.connect(process.env.MONGODB_URI, {
    dbName : "backend",
}).then(()=>console.log("Database connected")).catch((e)=> console.log(e))


// const pathloc = path.join(path.resolve(), "views");

//  MIDDLEWARES 

app.use(express.urlencoded({extended: true}));


app.get("/", async(req, res)=>{
    
    // console.log(pathloc)
   await registerdata.create({name : "shivam", email : "s@gmail.com", password : "shdfsdlkf"})
   res.send("done")

})

app.get("/register", (req, res)=>{
    res.render("register")
})

app.get("/added", (req, res)=>{
    res.render("added")
})

app.post("/register", async(req, res)=>{
    const {name , email, password} = req.body;

   await registerdata.create({
        name:name,
        email: email,
        password: password,
    })

    res.redirect("/added")
})
// we have to set engine
app.set("view engine" , "ejs")

app.get("/ejs", (req, res)=>{
    res.render("index", {msg : "hello from index.js"})
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})