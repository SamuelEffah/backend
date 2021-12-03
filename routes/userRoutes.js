const { prisma } = require(".prisma/client")
const express = require("express")
const router = express.Router()
const UserQuery = require("./../queries/userQuery")
const ReportQuery = require("./../queries/reportQuery")
const FollowQuery = require("./../queries/followQuery")
const PodcastQuery = require("./../queries/podcastQuery")

router.get("/", async(req,res)=>{
    try {
        const users = await UserQuery.getUsers()
         res.status(200).json({users})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.post("/user-bots", async(req,res)=>{
    // try {
        const bots = await UserQuery.createBots(req.body.data)
         res.status(200).json({bots})
    // } catch (error) {
    //     res.status(400).json({msg: "Something went wrong"})
    // }
})

router.post("/admin/:id/add/new-user",async(req,res)=>{
    try {
    const admin = await UserQuery.getAdmin(req.params.id)
    if(admin.id){
        await UserQuery.createUser(req,res)
    }
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

router.get("/admin/allusers/:id", async(req,res)=>{
    try {
        const users = await UserQuery.getUsers(req.params.id)
        
    res.status(200).json({users})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.post("/admin/ban/user", async(req,res)=>{
    try {
        const user = await UserQuery.banUser(req.body.data)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})


router.post("/admin/delete/user", async(req,res)=>{
    try {
        const status = await UserQuery.removeUser(req.body.data)
       
        res.status(200).json({status})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

router.post("/admin/promote/user", async(req,res)=>{
    try {
        const user = await UserQuery.promoteToCreator(req.body.data)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

router.get("/admin/:id/podcast/reports", async(req,res)=>{
    const admin = await UserQuery.getAdmin(req.params.id)
    if(admin.id){
 
        try {
            const reports = await ReportQuery.getAllReport()
       
        res.status(200).json({reports})

        } catch (error) {
            res.status(400).json({msg: "Something went wrong"})
        }
    }

})


router.get("/admin/:id", async(req,res)=>{
    try {
        const user = await UserQuery.getAdmin(req.params.id)
        const stats = await UserQuery.stats(req.params.id, user)
        const categories = await UserQuery.statsCategory()
        const reports = await ReportQuery.getAllReport()
       
    res.status(200).json({user,stats,categories,reports})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})








router.post("/profile/edit", async(req,res)=>{

    try {
        const user = await UserQuery.updateUser(req.body.data)
     res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

router.get("/:username", async(req,res)=>{
    try {
        const user = await UserQuery.getUserByUsername(req.params.username)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/search/:query", async(req,res)=>{
    try {
        const users = await UserQuery.findByQuery(req.params.query)
        const podcasts = await PodcastQuery.searchPodcatsByQuery(req.params.query)
       
        res.status(200).json({users: [...users,...podcasts]})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})


router.get("/podcast/top-creators", async(req,res)=>{
    try {
    const creators = await UserQuery.topCreators()
    res.status(200).json({creators})
    }catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})


router.post("/following-user", async(req,res)=>{
  try{
    const following = await FollowQuery.followUser(req.body.data)

    res.status(200).json(following)
  }catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})
router.post("/unfollow-user", async(req,res)=>{
   
    const unfollow = await FollowQuery.unFollowUser(req.body.data)
    
    res.status(200).json(unfollow)
})

router.post("/check-follow", async(req,res)=>{
    
    const checkfoll = await FollowQuery.checkFollow(req.body.data)
    

    res.status(200).json(checkfoll)
})


router.get("/:username/followers", async(req,res)=>{
    try {
        const followers = await UserQuery.getUserFollowers(req.params.username)
        res.status(200).json(followers)
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/:username/following", async(req,res)=>{
    try {
        const following = await UserQuery.getUserFollowing(req.params.username)
        res.status(200).json(following)
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/:username/following/activity", async(req,res)=>{

        try {
            const following = await UserQuery.getFollowingActivity(req.params.username)
            res.status(200).json({following})
        } catch (error) {
            res.status(400).json({msg: "Something went wrong"})
        }
    
  
   
})


module.exports  = router