const express =require('express');
const mongoose =require('mongoose');
const app=express();
const env=require('dotenv')
const bodyParser=require('body-parser');
const cors=require('cors')
const authRouter=require('./routes/auth')
const usersRouter=require('./routes/users')

const DB_CONN=process.env.DB_CONNECTION

//db connection
mongoose.connect(DB_CONN,{ useNewUrlParser: true,
    useUnifiedTopology: true  }).then(()=>{
    console.log('db connected')
}).catch(err=>{
    console.log(err)
})


app.get('/',(req,res)=>{
    return res.status(200).json({'msg':'hello from node'})
 })

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/users',usersRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`)
})


