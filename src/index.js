const express=require("express")
const app=express()
const todoController=require("./controllers/todo.controller")
const userController = require("./controllers/user.controller");

const {register,login}=require("./controllers/auth.controller")

app.use(express.json())

app.use("/todos",todoController)
app.use("/users", userController);

app.post("/register",register)
app.post("/login", login);

module.exports=app