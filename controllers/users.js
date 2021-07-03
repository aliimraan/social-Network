const userModel = require("../models/users");
const friendsModel = require("../models/friends");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

exports.getAllNonFrinedUsers = async (req, res) => {
  const {_id} =req.user
  const allUser = await userModel.find()
  const filterResult=allUser.filter(el=>{
    if(el._id!=_id){
      return el
    }
  })
  return res.status(200).json({filterResult})
};

exports.getAllFriends = async (req, res) => {
  const { _id } = req.user;

  const result = await friendsModel.find({friendOf:_id,status:true}).populate('user')
  console.log(result)
  if(!result){
    return res.status(400).json({ msg: "Friend List is Empty, Send request to get connected" });
  }
    return res.status(200).json({result})
};

exports.confirmFriendRequest = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.user;

  const result = await friendsModel.findOneAndUpdate({user:id,friendOf:_id},{status:true})
  if(!result){
    return res.status(400).json({ msg: "something went wrong" });
  }
    return res.status(200).json({result})
};

exports.getAllRequest = async (req, res) => {
  const { _id } = req.user;
  console.log(_id)

  const result = await friendsModel.find({ friendOf:_id}).where({'status':'false'}).populate('user')
  console.log(result)
  if(!result){
    return res.status(400).json({ msg: "No Request" });
  }
    return res.status(200).json({result})
};

exports.getMutualFriends = async (req, res) => {
  const { requestedId } = req.params.id;
  const { _id } = req.user;

  const myfriends = await friendsModel.find({friendOf:_id})
  const otherUser=await friendsModel.find({friendOf:requestedId})
  if (myfriends.length>=1){
    const mutual=myfriends.filter(friends=>{
      otherUser.map(el=>{
        if(el.user==friends.user){
          return el
        }
      })
    })
    return res.status(200).json({mutual})
  }else{
    return res.status(200).json({msg:'No MUtual Friend'})
  }
};

exports.sendFriendRequest = async (req, res) => {
  const {id} =req.body
  const { _id } = req.user;

  try{
    const newfriendsModel = new friendsModel({
      user:_id ,
      friendOf:id 
    })
    const result = await newfriendsModel.save()
    console.log(result)
    
  }catch(e){
    return res.status(400).json({e})
  }
  
};

exports.searchUser = async (req, res) => {

    try{
      let userpattern=new RegExp("^"+req.body.query)
    const searchResult=await userModel.find({firstName:{$regex:userpattern,$options:'$i'}})
      if(searchResult){
        return res.status(200).json({searchResult})
      }
    }catch(err){
        return res.status(400).json({err})
    }

};
