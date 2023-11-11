
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/userOperation')
    .then(() => { console.log("Connected to mongodb"); })

    .catch((err) => { console.log("not Connected to mongodb", err); })



const userRouter = require('./router/user')
app.use('/', userRouter)


app.listen(2255, (err) => {
    if (!err)
        console.log("listening port");
    else
        console.log("error", err)
})