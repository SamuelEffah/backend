
require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const { PrismaClient } = require('@prisma/client');
const session = require("express-session")
const {checkAuth} = require("./middleware/checkAuth")
const http = require('http');
const server = http.createServer(app);
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const prisma = new PrismaClient();
const {Server} = require("socket.io")
const io = new Server(server,{ cors: { origin: '*' } })
const SocketHandler = require("./routes/socketHandler")
const {passport,router:AuthRoutes} = require("./routes/auth/githubAuth")

// app middleware 
app.use(session({
    secret: "fasd43knf8cafsas",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 24*60*60*1000
    }
}))

app.use(cors({
    origin:["http://localhost:3000", "https://nostalgic-goldstine-c60717.netlify.app"],
    methods: "GET, POST, PUT"
}
))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



SocketHandler.start(io)


const UserQuery = require("./queries/userQuery")

//routes 

const userRoutes = require("./routes/userRoutes")
const podcastRoutes = require("./routes/podcastRoutes")
const episodeRoutes = require("./routes/episodeRoutes")


passport.serializeUser((user,cb)=>{
    cb(null,user)
})

passport.deserializeUser((user,cb)=>{
    cb(null,user)
})


// routes 

app.post("/api/v1/local/login", async(req,res)=>{
   
    let email = req.body.data.email
    let password = req.body.data.password
  
    
   const user =  await prisma.user.findUnique({
      where:{
        email
      },
      select:{
        id:true,
        hashedPassword: true
      }
    })
     const gn = await bcrypt.compare(password, user.hashedPassword)
      
     if(gn === false){
      
        res.json({msg:"asfasdf"})
     }
      else{
        var accessToken = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });
        var refreshToken = jwt.sign({ id:user.id }, process.env.JWT_SECRET, {
            expiresIn: 60*60*24*30 // expires in 24 hours
          });
         return res.status(200).json({a: accessToken, r:refreshToken})
      }
        
  })
app.get("/authenticated/:id", async(req,res)=>{
    const user = await UserQuery.getUserById(req.params.id)
   
    res.status(200).json({user})
})
// TODO - protected route with middleware - checkauth
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/podcast", podcastRoutes)
app.use("/api/v1/episodes",episodeRoutes)
app.use("/auth", AuthRoutes)



//comment out when running test 
const PORT = process.env.PORT || 4001

//comment out when running test
server.listen(PORT, ()=>{
    console.log(`app listening of http://localhost:${PORT}`)
})

// uncomment for tests run 
// module.exports = app