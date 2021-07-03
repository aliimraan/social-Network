const express=require('express')
const router=express.Router()
const {usersRegister,usersLogin}=require('../controllers/auth')
const { signUpRequestValidator ,signUpRequestValidatorResult,loginRequestValidator,loginRequestValidatorResult} = require('../validator')

router.post('/register',signUpRequestValidator ,signUpRequestValidatorResult,usersRegister)
router.post('/login',loginRequestValidator,loginRequestValidatorResult,usersLogin)


module.exports=router
