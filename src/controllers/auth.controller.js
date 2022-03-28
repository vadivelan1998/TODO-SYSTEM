const User=require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken=(user)=>{
  return jwt.sign({user},process.env.SECRET)
}

const register=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email})

        if(user){
            return res.status(400).send("email already exists")

        }

        user=await User.create(req.body)

        const token = generateToken(user)
        return res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
}


const login=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("wrong email or password")

        }
        const match=user.checkPassword(req.body.password)

        if(!match)
        {
            return res.status(400).send("wrong email or password");
        }
        const token=generateToken(user)
        return res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports={register,login}