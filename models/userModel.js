const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:
    {   type: String,
        required: [true, "Please enter the username"],
        unique: true,
      
        trim:true
    },
    name: {
        type: String,
        required: [true, "Please enter your name"],
       
      
        trim:true
    },
   email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    }
   

  
}, {
    timestamps: true
})



module.exports  = mongoose.model('User', userSchema)