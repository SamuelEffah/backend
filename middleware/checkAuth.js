exports.checkAuth = async(req,res,next)=>{
    if(req.user){
        console.log("already authenica ", req.user)
        next()
    }
    else{
        res.redirect("http://localhost:4001")
    }


}