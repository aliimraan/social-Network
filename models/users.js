const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    hashedPassword:{
        type:String,
        required:true,
    }

},{timestamps:true})

const userModel=mongoose.model('users',userSchema)
module.exports=userModel