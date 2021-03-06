//Router
const UserRouter = require('express').Router();

//User model
const Users = require('../models/userModel.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//Config file has all sensitive data like db URI, SECRET etc
const config = require('../utils/config');

const sendMail = require('./sendMail');

//Middleware
const middleware = require('../utils/middlewares');

//Functions to handle register 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
    return jwt.sign(payload,`${config.ACCESS_TOKEN_SECRET}`,{expiresIn: '5m'});
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, `${config.ACCESS_TOKEN_SECRET}`, {expiresIn: '15m'});
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, `${config.REFRESH_TOKEN_SECRET}`, {expiresIn: '7d'});
}


UserRouter.post('/register', async(request, response) =>{
   
    try{
       
    
        const username = String(request.body.username);
        const name = String(request.body.name);
        const email = String(request.body.email);
        const password = String(request.body.password);
       
        if(name.length === 0 || email.length === 0 || password.length === 0 || username.length === 0){
            
            return response.status(400).json({msg: "Please fill in all fields."});
        }
        if(!validateEmail(email)){
            return response.status(400).json({msg: email + " is not valid :("});
        }
        const user = await Users.findOne({email: email});
        
        if(user) return response.status(400).json({msg: "This email is already taken."});
        
        const CheckUniqueUsername = await Users.findOne({username: username});
        if(CheckUniqueUsername)
        {
            return response.status(400).json({msg: "The username is already taken"});
        }
        if(password.length < 6){
            return response.status(400).json({msg: "Password must be atleast 6 characters"});
        }

        const passwordHash = await bcrypt.hash(password,12);
        
        const newUser = {
            username: username,
            name: name,
            email: email,
            password: passwordHash
        }
        
        const activation_token = createActivationToken(newUser);
  
        const url = `${config.CLIENT_URL}/user/activate/${activation_token}`;
       
     
      try{
        sendMail(email, url, "Verify your email address");
      }
      catch(err)
      {
          console.log(err);
      }
        

        response.status(200).json({msg: "Register Success! Please activate your email to start."});
    }
    catch(error){
        return response.status(500).json({msg: error.message});
    }
})
UserRouter.post('/activateEmail', async(request, response) =>{
   
   try{
    const {activation_token} = request.body;
  
   const user =  jwt.verify(activation_token, `${config.ACCESS_TOKEN_SECRET}`);

    const {username, name,email, password} = user;
    const check = await Users.findOne({email});
    if(check)
    {
        return res.status(400).json({msg: "This email already exists"});
    }
    const newUser = new Users({
        username: username,
       name: name,
        email: email,
        password: password
    })
    await newUser.save();
    console.log(newUser);
    response.json({msg: "Account has been activated"});
   }
   catch(err){
       console.log(err);
       return response.status(500).json({msg: err.message});
   }
    
})
UserRouter.post('/login', async(request, response) => {
   
    try{
        
        
        const email = request.body.email;
        const password = request.body.password;
      
        const user = await Users.findOne({email: email});
        if(!user) return response.status(400).json({msg: "This email does not exists"});
      
      
        const isMatch= await bcrypt.compare(`${password}`, `${user.password}`);
        if(!isMatch) return response.status(400).json({msg: "Password is incorrect"});
        const refresh_token = createRefreshToken({id: user._id});
       
        response.cookie('refreshtoken', refresh_token,{
            httpOnly: true,
            path: '/api/Users/refresh_token',
            maxAge: 7 * 24 * 60 * 60* 1000 // 7 days
        })
        response.status(200).send({msg: "Login successful", userInfo: user});
    }
    catch(err)
    {
        return response.status(500).json({msg: err.message});
    }
})

UserRouter.post('/refresh_token', async(request, response) => {
    try{
        
       const rf_token = request.cookies.refreshtoken;
       
       if(!rf_token) return response.status(400).json({msg: "Please login now !"});
       
       jwt.verify(rf_token, `${config.REFRESH_TOKEN_SECRET}`, (err, user) =>{
           if(err)return response.status(400).json({msg: "Please login now"});
           const access_token = createAccessToken({id: user.id});
           response.json({access_token});
       })
    }
    catch(err)
    {
        return response.status(500).json({msg: err.message});
    }
})
UserRouter.post('/forgotPassword',async (request, response) => {
     try{
          const {email} = request.body;

          const user = await Users.findOne({email});

          if(!user) return response.status(400).json({msg: "This email does not exist."});

          const access_token = createAccessToken({id: user._id});

          const url = `${config.CLIENT_URL}/user/reset/${access_token}`;

          sendMail(email,url, "Reset your password");

          response.json({msg: "Re-set the password, Please check your email..."});
     }
     catch(err){
        return response.status(500).json({msg: err.message});
     }
})
UserRouter.post('/resetPassword',middleware.auth, async (request, response) => {
    try{
   
        const password = request.body.password;

        
          
          const passwordHash = await bcrypt.hash(`${password}` ,12);
         
          const user = request.user;
       
          await Users.findOneAndUpdate({_id: user.id}, {
              password: passwordHash
           
          }, {new: true})
          response.json({msg: "Password successfully changed!"})
    }
    catch(err){
        
        return response.status(500).json({msg: err.message})
    }
})

module.exports = UserRouter