const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true }, // ( String, required)
    lastName: { type: String, required: false }, //( String, optional)
    email: { type: String, required: true }, //( String, required)
    password: { type: String, required: true }, //( String, required)
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.pre("save",function(next){
    const hash=bcrypt.hashSync(this.password,8)
    this.password=hash
})

userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

const User=mongoose.model("user",userSchema)


module.exports=User
