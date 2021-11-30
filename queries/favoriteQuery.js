const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addFavorite= async(data)=>{

    const fav = await prisma.favorite.create({
        data,
        select:{
            podcast:true,
            creatorId: true,
            podcastId: true
        }
    })

    
    if(fav && fav.creatorId && fav.podcastId){
        return true
    }
    return false
}

const checkFav = async(data)=>{
    const fav= await prisma.favorite.findUnique({
        where:{
            creatorId_podcastId:{
                creatorId: data.creatorId,
                podcastId: data.podcastId
            }
        }
    })
    
    if(fav && fav.creatorId && fav.podcastId){
        return true
    }
    return false
    
}



const removeFavorite = async(data)=>{

    const delFav = await prisma.favorite.delete({
        where:{
            creatorId_podcastId:{
                creatorId: data.creatorId,
                podcastId: data.podcastId
            }
        }
    })
    
    return delFav

}



module.exports = {
    addFavorite,
    removeFavorite,
    checkFav
}