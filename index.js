import express, { urlencoded } from "express";
import path from "path";
import { registerdata } from "./form.model.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { login, logout, registration } from "./controllers/user.js";


const app = express();
// const port = 3000;

config();

mongoose.connect(process.env.MONGODB_URI, {
    dbName : "backend",
}).then(()=>console.log("Database connected")).catch((e)=> console.log(e))


// const pathloc = path.join(path.resolve(), "views");

//  MIDDLEWARES 

app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


// we have to set engine
app.set("view engine" , "ejs")


const isAuthenticated = async(req, res, next)=>{

    const {token} = req.cookies ;

    if(token){
      const decoded =  jwt.verify(token, process.env.TOKEN_PRIVATE_KEY)   // decoded will get two things _id and iat

     req.user = await registerdata.findById(decoded._id)
    //  console.log(req.user)

        next();
    }
    else{
        res.redirect("/login");
    }

}

app.get("/",isAuthenticated, async(req, res)=>{
    
    res.render("logout",{name: req.user.name})
    // console.log(pathloc)
//    await registerdata.create({name : "shivam", email : "s@gmail.com", password : "shdfsdlkf"})
//    res.send("done")
    // console.log(req.cookies.token)

    
})

app.get("/login", (req, res)=>{
    res.render("login")
})

app.post("/login",login)

app.get("/logout", logout )

app.get("/register", (req, res)=>{
    res.render("register")
})

app.post("/register",registration )


app.listen(process.env.PORT, ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})