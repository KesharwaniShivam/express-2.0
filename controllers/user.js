import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { registerdata } from "../form.model.js";


// REGISTRATION
export const registration = async (req, res) => {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)    // password encryption

    let user = await registerdata.findOne({ email });

    if (user) {
        // console.log(user)
        return res.redirect("/login")
    }

    user = await registerdata.create({
        name: name,
        email: email,
        password: hashPassword,
    })

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_PRIVATE_KEY);  // this will encode user._id

    // hmko aise ID direct provide nhi karani chahiye to hum ENCODE Krke bhej denge ID 
    // for encoding we will use JSONWEBTOKEN

    // res.cookie("token", user._id,{    // here we access the collected data Id 
    res.cookie("token", token, {
        httpOnly: true,              // best security practice 
        expires: new Date(Date.now() + 50 * 1000)
    })

    res.redirect("/");

    // res.redirect("/added")
}





// LOGIN

export const login = async (req, res) => {

    const { email, password } = req.body

    let user = await registerdata.findOne({ email });

    if (!user) {
        return res.redirect("/register")
    }

    // const isMatch = user.password === password; 
    // our database password is hashed so to compare the password with the hashed one , we have to hash the current password 

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
        return res.render("login", { msg: "Incorrect password", email })
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_PRIVATE_KEY);
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 50 * 1000)
    })
    res.redirect("/");

}

export const logout = (req, res) => {

    res.cookie("token", null, {
        httpOnly: true,              // best security practice 
        expires: new Date(Date.now())  // expires now to remove token immediately
    })
    res.redirect("/")
}