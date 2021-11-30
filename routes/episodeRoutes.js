const express = require("express")
const router = express.Router()
const EpisodeQuery = require("../queries/episodeQuery")


router.get("/:id", async(req,res)=>{
    try {
        const episode = await EpisodeQuery.getById(req.params.id)
         res.status(200).json({episode})
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
    
})


router.post("/creator/create", async(req,res)=>{
  
    try {
        const episodes = await EpisodeQuery.createEpisode(req.body.data.episode)
       
         res.status(200).json({episodes})
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
   
})



router.post("/edit", async(req,res)=>{
    try {
        const episode = await EpisodeQuery.updateEpisode(req.body.data)
         res.status(200).json({episode})
     } catch (error) {
         res.status(400).json({msg: "Something went wrong"})
     }
   
})

module.exports = router