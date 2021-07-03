const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.usersRegister = async (req, res) => {
    const {firstName,lastName,email,password}=req.body   
    bcrypt.hash(password,10,(err,hash)=>{
            if(err) throw err
            const hashedPassword= hash

        const newUserModel=new userModel({
            firstName,lastName,email,hashedPassword
        })

        newUserModel.save().then(data=>{
           return res.status(201).json({'msg':'account creacted successfully'})
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({err,'msg':'cradentials already in use'})
        })
    })

//   const { firstName, lastName, email, password } = req.body;
//   try {
//     const hash = bcrypt.hash(password, 10);
//     console.log(hash)
//     if (hash) {
//       const hashedPassword = hash;
//       console.log(hashedPassword)
//       const newUser = new user({ firstName, lastName, email, hashedPassword });
//       const res = await newUser.save();
//       if (res) {
//         return res
//           .status(200)
//           .json({ data, msg: "Account created successfully" });
//       }
//     }
//   } catch (e) {
//     return res.status(400).json({ msg: "creation failed" });
//   }
};
exports.usersLogin = async (req, res) => {
    const {email,password}=req.body
    console.log(email,password)
   
    userModel.find({email:email}).then(data=>{
        console.log(data)
      if(data){
            bcrypt.compare(password,data[0].hashedPassword,(err,result)=>{
                if(err) throw err

                if(result){
                    const {_id,firstName,lastName,email,}=data[0]
                    const fullname=`${firstName} ${lastName}`
                    const user={_id,fullname,email}
                    const token=jwt.sign({_id:data[0]._id,role:data[0].role},process.env.JWT_AUTH)
                     return res.status(200).json({token,user,'msg':'you are logged in'})
                }else{
                    return res.status(400).json({'msg':'wrong password'})
                }
            })
        }
    }).catch(err=>{
        res.status(400).json({'msg':'invalid email'})
    })


//   const { email, password } = req.body;
//   try {
//     const registerUser = await users.findOne({ email: email });
//     if (!registerUser) {
//       return res
//         .status(401)
//         .json({ msg: "Not registered user,Please register first" });
//     }
//     bcrypt
//       .compare(password, data[0].hashedPassword)
//       .then((result) => {
//         if (!result) {
//           return res.status(400).json({ msg: "Wrong password" });
//         }
//         const token = jwt.sign({ id: data._id }, process.env.JWT_AUTH);
//         return res.status(200).json({ token, data, msg: "You are logged in" });
//       })
//       .catch((err) => console.log(err));
//   } catch (e) {
//     return res.status(500).json({ e });
//   }
};
