const jwt = require("jsonwebtoken")
const UserQuery = require("./../queries/userQuery")

const start = (io)=>{

    io.on("connection", (async(socket)=>{

        console.log("Connection Established")
        socket.on("auth", async(data)=>{
            console.log("checking auth...")
            if(data && data.accessToken && data.refreshToken){
                let accessTokenVerify = verifyToken(data.accessToken)
                let refreshTokenVerify = verifyToken(data.refreshToken)
                if(accessTokenVerify && refreshTokenVerify && accessTokenVerify.id && refreshTokenVerify.id){
                    const user = await UserQuery.getUserById(accessTokenVerify.id)
                    socket.emit("getUser", user)
                }

            }
         
        })
    }))

}


const verifyToken=(token)=>{
    var verifiedToken = jwt.verify(token, process.env.JWT_SECRET, (err,cliams)=>{
        if(err) return false
        return cliams
    })
    return verifiedToken
}


module.exports = {
    start
}