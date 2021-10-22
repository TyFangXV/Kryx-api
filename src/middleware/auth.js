const express = require("express");

//CUSTOM MODULES
const userSchema = require("../model/user")
const createUuid = require("../lib/id");
const {createCookie, updateCookie} = require("../lib/cookie");
const user = require("../model/user");
const cookie = require("../model/cookie");
//INITIALIZATION
const router = express.Router();


router.post("/createUser", async(req, res)=>{
 try {
    const {username, email, password, ip} = req.body;
    const userExist = await user.exists({email : email})
    if(!userExist)
    {
        const sessionToken = createUuid();
        const User = new userSchema({
            username : username,
            Email : email,
            password : password,
            sessionToken : sessionToken
        })
        User.save();
        //generate a cookie and respond with a cookie
        const cookie = createCookie(ip, sessionToken);
        res.send(cookie);    
    } else {
      res.status(409).send("A User under this email already exist");
    }   
 } catch (error) {
   res.status(500).send(error.message);
 }


})


router.get("/getUserByCookie", async(req,res)=> {
  try {
      //get the ip and the session token from the cookie data to find the user
      const {sessionToken, ip} = await cookie.findOne({cookie : req.headers.cookie})
      //if the ip that send the req matches the ip registered 
      if(req.headers.ip == ip)
      {
        const users = await userSchema.find();
        const newCookie = await updateCookie(req.headers.ip)
        res.send({data : users.find(user => user.sessionToken === sessionToken), cck : newCookie});
      } else{
        res.sendStatus(404)
      }    
  } catch (error) {
    res.status(500).send("Error has occured" + error.message)
  }
})


module.exports = router;