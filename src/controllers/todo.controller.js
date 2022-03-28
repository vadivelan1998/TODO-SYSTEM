const Todo=require("../models/todo.model")
const express=require("express")
const authenticate=require("../middlewares/authenticate")

const router=express.Router()

router.get("",authenticate,async(req,res)=>{
    try {
         req.body.userId = req.user;
      const todo = await Todo.find().lean().exec(); 
      
      return res.status(200).send({todo:todo})
    } catch (error) {
       return res.status(400).send(error)             
    }
    
})

router.post("",authenticate, async (req, res) => {
  try {
      req.body.userId=req.user
    const todo = await Todo.create(req.body);

    return res.status(200).send({ todo:todo });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    req.body.userId = req.user;
    const todo = await Todo.findById(req.params.id).lean().exec();

    return res.status(200).send({ todo: todo });
  } catch (error) {
    return res.status(401).send(error);
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    req.body.userId = req.user;
    const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

    return res.status(200).send({ todo: todo });
  } catch (error) {
    return res.status(401).send(error);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    req.body.userId = req.user;
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).send({ todo: todo });
  } catch (error) {
    return res.status(401).send(error);
  }
});




module.exports=router
