const { prisma } = require(".prisma/client")
const express = require("express")
const router = express.Router()
const UserQuery = require("./../queries/userQuery")
const ReportQuery = require("./../queries/reportQuery")

router.get("/", async(req,res)=>{
    try {
        const users = await UserQuery.getUsers()
    res.status(200).json({users})
    } catch (error) {
        res.status(400).json({msg: error})
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








router.post("/edit", async(req,res)=>{
    try {
        const user = await UserQuery.updateUser(req.body.data.id,req.body.data.data)
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
        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})


router.get("//followers", async(req,res)=>{
    try {
        const followers = await UserQuery.getUserFollowers(req.params.username)
        res.status(200).json({followers})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})


router.get("/:username/followers", async(req,res)=>{
    try {
        const followers = await UserQuery.getUserFollowers(req.params.username)
        res.status(200).json({followers})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/:username/following", async(req,res)=>{
    try {
        const following = await UserQuery.getUserFollowing(req.params.username)
        res.status(200).json({following})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/:username/following/activity", async(req,res)=>{
    // try {
        const following = await UserQuery.getFollowingActivity(req.params.username)
      
        res.status(200).json({following})
    // } catch (error) {
    //     res.status(400).json({msg: "Something went wrong"})
    // }
   
})


module.exports  = router