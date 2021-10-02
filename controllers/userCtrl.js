
const UserRouter = require('express').Router();
const Users = require('../models/userModel');
//Functions to handle register 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

        //const passwordHash = await bcrypt.hash(password,12)
        
        // const newUser = {
        //     username: username,
        //     name: name,
        //     email: email,
        //     password: passwordHash
        // }
        // const activation_token = createActivationToken(newUser)
  
        // const url = `${config.CLIENT_URL}/user/activate/${activation_token}`
       
     
    //   try{
    //     sendMail(email, url, "Verify your email address")
    //   }
    //   catch(err)
    //   {
    //       console.log(err)
    //   }
        

        response.status(200).json({msg: "Register Success! Please activate your email to start."})
    }
    catch(error){
        return response.status(500).json({msg: error.message})
    }
})
module.exports = UserRouter;