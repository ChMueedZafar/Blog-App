import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isMobilePhone, 'Please enter a valid phone number']
    },
    photo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    education: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model('User', userSchema)
