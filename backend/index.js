const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const userSchema = require('./models/userModel')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://adhsashish125:3OoQVU05QNoFbBmR@democode.3hldz.mongodb.net/?retryWrites=true&w=majority&appName=democode")
app.post('/register',(req,res) => {
    userSchema.create(req.body)
    .then(users => users.json())
    .catch(err => res.json(err))

})
app.listen(3001, () => {
    console.log("Server is Running");
});