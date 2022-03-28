const User=require("../models/user.model")

const express=require("express")
const router=express.Router()

router.get("", async (req, res) => {
  try {
    
    const user = await User.find().lean().exec();

    return res.status(200).send({ user: user });
  } catch (error) {
    return res.status(401).send(error);
  }
});
module.exports=router