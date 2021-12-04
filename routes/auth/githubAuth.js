const passport = require("passport")
const express = require("express")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router()
const bcrypt = require("bcryptjs")
const GitHubStrategy = require("passport-github").Strategy
const UserQuery = require("./../../queries/userQuery")
const {generateToken, verifyToken} = require("./../../utils/token")
const jwt = require("jsonwebtoken")

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL:process.env.CALLBACK_URL
    },
    function(accessToken,refreshToken, profile,cb){
      UserQuery.findOrCreate(profile, function(err,user){
          return cb(err,user)
      })

    }
))


router.get("/github", passport.authenticate('github'))


router.get("/github/callback", 
passport.authenticate('github', {failureRedirect: process.env.REDIRECT_URL}), (req,res)=>{
  

    var accessToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
    var refreshToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: 60*60*24*30 // expires in 24 hours
      });
      let url = process.env.REDIRECT_URL + "auth/?a=" + accessToken+"&r="+refreshToken
    
    res.redirect(url)
}
)




 
 

 
  // if(isUser){
  //   bcrypt.compare(password, isUser.hashedPassword, (err,claim)=>{
  //     if(err){
  //       console.log("cons ", err)
       
  //      return res.status(404).json({msg: "something went wrong"})
  //     }
  //     if(claim){
  //       console.log("claim", claim)
  //     //   var accessToken = jwt.sign({ id: isUser.id}, process.env.JWT_SECRET, {
  //     //     expiresIn: 86400 // expires in 24 hours
  //     //   });
  //     // var refreshToken = jwt.sign({ id:isUser.id }, process.env.JWT_SECRET, {
  //     //     expiresIn: 60*60*24*30 // expires in 24 hours
  //     //   });
  //      return res.status(200).json({a: "", r:"afasdf"})
  //     }
  //   })
  // }
  // else {
    
  //   res.status(404).json({msg: "something went wrong"})
  // }



module.exports ={
    passport,
    router
}

