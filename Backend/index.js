import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
const app = express()
dotenv.config()

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
// middleware
app.use(express.json())

// db connection
try{
mongoose.connect(mongoURI)
console.log("Connected to MongoDB")
}catch(error){
    console.log(error)
}
// define routes
app.use('/api/user', userRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
