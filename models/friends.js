const mongoose=require('mongoose')
const friendsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    friendOf:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    status:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const friendsModel=mongoose.model('friends',friendsSchema)
module.exports=friendsModel

