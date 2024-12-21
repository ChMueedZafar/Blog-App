import express from 'express'
import { register } from '../controller/user.controller.js'

const router = express.Router()

router.post('/register', register)

router.get('/check-email/:email', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.params.email });
    res.json({
      available: !existingUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking email availability"
    });
  }
});

export default router