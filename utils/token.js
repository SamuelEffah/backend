const jwt = require("jsonwebtoken")


const generateToken = (req,res)=>{
   let signToken = null
   jwt.sign({id: req.user.id}, process.env.JWT_SECRET, (err, token)=>{
    
    if(err) console.log(err)
    console.log(token)
    if (token){
        req.session.accessToken = token
        signToken = token
        // return  token
    }
    
   
   })
   console.log('ts', signToken)
   return signToken
}

const verifyToken = (token)=>{
    jwt.verify(token, process.env.JWT_SECRET, (err, id)=>{
    if(!err){
        return id
    }
    else{
        return false
    }
    })
}

module.exports = {
    generateToken,
    verifyToken
}
