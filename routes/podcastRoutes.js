const express = require("express")
const router = express.Router()
const PodcastQuery = require("../queries/podcastQuery")
const FavoriteQuery = require("../queries/favoriteQuery")
const UserQuery = require("../queries/userQuery")
const ReportQuery = require("../queries/reportQuery")

router.post("/creator/create", async(req,res)=>{
    try {
        const user = await PodcastQuery.createPodcast(req.body.data.podcast)
        
         res.status(200).json({user})
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
})


router.post("/podcast-bots", async(req,res)=>{
   
    try {
        req.body.data.forEach(async(element) => {
            await PodcastQuery.createPodcast(element)
        });
        
         res.status(200)
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
 
})

router.post("/user/report", async(req,res)=>{
    try {
        const issue = await ReportQuery.issueReport(req.body.data)
   
        res.status(200).json(issue)
       
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
   
})


router.get("/:id", async(req,res)=>{
    try {
       const podcasts = await PodcastQuery.getByUserId(req.params.id)
        res.status(200).json({podcasts})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.get("/filter/:tag", async(req,res)=>{

  
    try {
       const podcasts = await PodcastQuery.getPodcastByTag(req.params.tag)
       
        res.status(200).json({podcasts})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.post("/user/favorite", async(req,res)=>{
   
    if(req.body.data.action == "add"){
      
        const addFav = await FavoriteQuery.addFavorite(req.body.data)
        const user = await UserQuery.getUserById(req.body.data.creatorId)
       
        res.status(200).json({isFavorite: addFav, user})
    }
    if(req.body.data.action == "remove"){
        
        const remFav = await FavoriteQuery.removeFavorite(req.body.data)
        const user = await UserQuery.getUserById(req.body.data.creatorId)
        // // console.log("add ", remFav)
        // res.status(200).json({msg: "safda"})
      
        res.status(200).json({isFavorite: remFav, user})
    }
  
})


router.post("/check-favorite", async(req,res)=>{
    try {
        const fav = await FavoriteQuery.checkFav(req.body.data)
        res.status(200).json({isFavorite: fav})
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
  

})







router.get("/episodes/:id", async(req,res)=>{
    try {
       const episodes = await PodcastQuery.getPodcastEpisodes(req.params.id)
        res.status(200).json({episodes})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})


router.post("/edit", async(req,res)=>{
   
    try {
        const podcast = await PodcastQuery.updatePodcast(req.body.data.id, req.body.data)
        
        res.status(200).json({podcast})
     } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
     }


})



router.get("/explore/top-podcasts", async(req,res)=>{
    try {
       const podcasts = await PodcastQuery.getTopPodcasts()
        res.status(200).json({podcasts})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

router.get("/explore/just-in", async(req,res)=>{
    try {
       const podcasts = await PodcastQuery.getLatestPodcast()
        res.status(200).json({podcasts})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
})

module.exports = router