import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import { v2 as cloudinary } from 'cloudinary'
import fileupload from 'express-fileupload'

const app = express()
dotenv.config()

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
// middleware
app.use(express.json())

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))


// db connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
    process.exit(1);  // Exit process with failure
  });
// define routes
app.use('/api/user', userRoutes)

// cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
})

// Add this after your routes
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});
