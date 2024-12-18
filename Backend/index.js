import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()
dotenv.config()

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
// db connection
try{
mongoose.connect(mongoURI)
console.log("Connected to MongoDB")
}catch(error){
    console.log(error)
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
