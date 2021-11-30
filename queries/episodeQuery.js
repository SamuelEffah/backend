const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PodcastQuery = require("./podcastQuery")


const getById = async(id)=>{
    const episode  = new prisma.episode.findUnique({
        where:{
            id
        }
    })
    return episode
}

const createEpisode = async(data)=>{
    let epsData = {
        name: data.name,
        description: data.description,
        isRemoved: false,
        fileName: data.fileName,
        podcastId: data.podcast_id
    }
    const episode  = await prisma.episode.create({
        data: epsData
    })
    if(episode){
       const eps = await prisma.podcast.findUnique({
           where:{
               id: episode.podcastId
           },
           select:{
               epsiodes: {
                   orderBy: {
                       insertedAt: "desc"
                   }
               }
           }
       }) 
       return eps
    }
 
}

const removeEpisode = async(id)=>{
    const removedEps = await prisma.episode.delete({
        where:{
            id
        }
    })
}

const updateEpisode = async(id,data)=>{
    const updatedEpisode = await prisma.episode.update({
        where:{
            id
        },
        data
    })

    return updatedEpisode
}


module.exports = {
    createEpisode,
    removeEpisode,
    updateEpisode,
    getById
}
