const express = require("express")
const router = express.Router()
const PodcastQuery = require("../queries/podcastQuery")
const FavoriteQuery = require("../queries/favoriteQuery")

router.post("/creator/create", async(req,res)=>{
    try {
        const user = await PodcastQuery.createPodcast(req.body.data.podcast)
        
         res.status(200).json({user})
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

    console.log("tag ", req.params.tag)
    // res.status(200).json({msg: "Something went wrong"})
    try {
       const podcasts = await PodcastQuery.getPodcastByTag(req.params.tag)
       console.log(podcasts)
        res.status(200).json({podcasts})
    } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
    }
   
})

router.post("/user/favorite", async(req,res)=>{
    if(req.body.action == "add"){
        const addFav = await FavoriteQuery.addFavorite(req.body.data)
        // console.log("add ", addFav)
       
        res.status(200).json({isFavorite: addFav})
    }
    if(req.body.action == "remove"){
        const remFav = await FavoriteQuery.removeFavorite(req.body.data)
        // console.log("add ", remFav)
        res.status(200).json({msg: "safda"})
    }

})


router.post("/check-favorite", async(req,res)=>{
    const fav = await FavoriteQuery.checkFav(req.body.data)
    // console.log("check fav ", fav)
    res.status(200).json({isFavorite: false})

})


// router.get("/:id/favorite", async(req,res)=>{
//     // try {
//     //    const episodes = await PodcastQuery.getPodcastEpisodes(req.params.id)
//     //     res.status(200).json({episodes})
//     // } catch (error) {
//     //     res.status(400).json({msg: "Something went wrong"})
//     // }
// })




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
        // console.log("podcast ", podcast) 
        res.status(200).json({podcast})
     } catch (error) {
        res.status(400).json({msg: "Something went wrong"})
     }
    //  res.status(400).json({msg: "Something went wrong"})

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