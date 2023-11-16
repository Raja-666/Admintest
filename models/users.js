const mongoose = require('mongoose') 
const UserSchma = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    token: { type: String },
    image: {
        data: Buffer,
        contentType: String,
    } 
    
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
    )
    
    
    
    module.exports = UserModel = mongoose.model('User', UserSchma)
