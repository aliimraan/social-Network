const express=require('express')
const router=express.Router()
const {getAllNonFrinedUsers,getAllFriends,confirmFriendRequest,getMutualFriends,getAllRequest,sendFriendRequest,searchUser}=require('../controllers/users')
const {authenticate}=require('../common-middleware')


router.get('/allUsers',authenticate,getAllNonFrinedUsers)
router.get('/allFriends',authenticate,getAllFriends)
router.post('/confirm/request',authenticate,confirmFriendRequest)
router.get('/mutual',authenticate,getMutualFriends)
router.get('/requested/for/friend',authenticate,getAllRequest)
router.post('/send/friend/request/',authenticate,sendFriendRequest)
router.post('/search',searchUser)


module.exports=router
