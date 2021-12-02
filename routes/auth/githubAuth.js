const passport = require("passport")
const express = require("express")
const router = express.Router()
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

module.exports ={
    passport,
    router
}

