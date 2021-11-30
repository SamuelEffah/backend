
require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const {checkAuth} = require("./middleware/checkAuth")
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io")
const io = new Server(server,{ cors: { origin: '*' } })
const SocketHandler = require("./routes/socketHandler")
const {passport,router:AuthRoutes} = require("./routes/auth/githubAuth")

// app middleware 
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 24*60*60*1000
    }
}))
app.use(cors())
app.options("*", cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



SocketHandler.start(io)

// io.on("connection", (socket) => {
//     console.log("user connected")
//     // socket.on("message", (data)=>{
//     //     console.log(data)
//     // })
// })

// 
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
app.get("/", (req,res)=>{
    res.status(200).json({msg:"hello"})
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




const PORT = process.env.PORT || 4001

server.listen(PORT, ()=>{
    console.log(`app listening of http://localhost:${PORT}`)
})