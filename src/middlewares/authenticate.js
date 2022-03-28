const { rejects } = require("assert")
let jwt = require("jsonwebtoken")
const { resolve } = require("path")
require("dotenv").config()

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authenticate=async(req,res,next)=>{
    if(!req.headers.authorization)
    {
        return res.status(400).send("authorization token incorrect or not found")
    }
    if(req.headers.authorization.startsWith("Bearer "))
    {
        return res
          .status(400)
          .send("authorization token incorrect or not found");
    }
    const token=req.headers.authorization.trim().split(" ")[1]

    let decoded;
    try {
        decoded=await verifyToken(token)
    } catch (error) {
         return res
           .status(400)
           .send("authorization token incorrect or not found");
    }
    req.user=decoded.user._id
    return next()
}

module.exports=authenticate