const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserQuery = require("./userQuery")
const getByUserId = async(id)=>{
    const podcasts = await prisma.podcast.findMany({
        where:{
            creatorId: id
        },
        include:{
            epsiodes:{
                select:{
                    fileName:true,
                    name:true,
                    id:true,
                    description:true,
                    insertedAt: true
                  }
            }
        }
    })

    return podcasts
}




const getAllPodcasts = async()=>{
    const podcasts = await prisma.podcast.findMany({
        select:{
            tags:true
        }
    })
    return podcasts
}
const getById = async(id)=>{
    const podcast = await prisma.podcast.findUnique({
        where:{
            id
        }
    })
    return podcast
}



const createListPodcast =async(data)=>{

    const podcasts = await prisma.podcast.createMany({
        data,
    })

    return podcasts
}

const createPodcast = async(data)=>{
    let podcastData = {
        name: data.name,
        description: data.description,
        subtitle: data.subtitle,
        posterUrl: data.posterUrl,
        isPublish: true,
        creatorId: data.creatorId,
        tags: data.tags
    }

    const newPodcast = await prisma.podcast.create({
        data: podcastData,
    })


    
    if(newPodcast){
        let episodeData = {
            name: data.episodeName,
            description: data.episodeDescription,
            fileName: data.fileName,
            podcastId: newPodcast.id,
            isRemoved: false
        }
        const newEpisode = await prisma.episode.create({
            data: episodeData
        })

        if(newEpisode){
           const creator  = await UserQuery.getUserById(data.creatorId)
            if(!creator.isCreator){
               const newCreator = await UserQuery.promoteToCreator(data.creatorId)
               return newCreator
            }
            return creator

        }
        
        
    }   
  

}

const searchPodcatsByQuery = async(query)=>{
    const podcasts = await prisma.podcast.findMany({
        where:{
            OR:[
                {
                    name:{
                        endsWith: query,
                        mode: "insensitive"
                    } 
                },
                {
                    AND:{
                        name:{
                            startsWith: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]
        },
        include:{
            creator:{
                select:{
                    fullname:true
                }
            },
            epsiodes:{
                select:{
                  fileName:true,
                  name:true,
                  id:true,
                  insertedAt: true
                }
            }
        },
        take:5,
        orderBy: {
            numOfListeners: "desc"
        }
    })
    return podcasts

}

const getTopPodcasts = async()=>{
    const podcasts = await prisma.podcast.findMany({
        where:{
            numOfListeners:{
                gt: 10 
            }
        },
        include:{
            creator:{
                select:{
                    fullname:true
                }
            },
            epsiodes:{
                select:{
                  fileName:true,
                  name:true,
                  id:true,
                  insertedAt: true
                }
            }
        },
        take:10,
        orderBy: {
            numOfListeners: "desc"
        }
    })
    return podcasts
}

const getLatestPodcast = async()=>{
    const podcasts = await prisma.podcast.findMany({
        take:10,
        include:{
            creator:{
                select:{
                    fullname:true
                }
            },
            epsiodes:{
                select:{
                  fileName:true,
                  name:true,
                  id:true,
                  insertedAt: true
                }
            }
        },
        orderBy: {
            insertedAt: "desc"
        }
    })
    return podcasts
}

const getPodcastEpisodes = async(id)=>{
    const episodes = await prisma.episode.findMany({
        where:{
            podcastId: id
        }
    })

    return episodes
}


const deletePodcast = async(id)=>{
    const deletedPodcast = await prisma.podcast.delete({
        where:{
            id
        }
    })

    return deletedPodcast
}



const updatePodcast = async(id,data)=>{
    const updatedPodcast = await prisma.podcast.update({
        where:{
            id
        },
        data
    })
    return updatedPodcast
}


const incrementListeners = async(id)=>{
    const updatedListeners = await prisma.podcast.update({
        where:{
            id
        },
        data:{
            numOfListeners: {
                increment: 1 
            }
        }
    })
}


const incrementReports = async(id)=>{
    const updatedReports = await prisma.podcast.update({
        where:{
            id
        },
        data:{
            numOfReports: {
                increment: 1 
            }
        }
    })
}

const getPodcastByTag = async(tag)=>{
    const podcasts = await prisma.podcast.findMany({
        where:{
            tags:{
                has:tag
            }
        }
    })
    return podcasts
}

const getUserFavorites = async(id)=>{
    
    const podcasts = await prisma.user.findUnique({
        where:{
            id
        },
        select:{
            favorites:true
        }
    })

    return podcasts
}

// const posts = await client.post.findMany({
//     where: {
//       NOT: {
//         tags: {
//           has: 'databases',
//         },
//       },
//     },
//   })

module.exports = {
    getByUserId,
    getAllPodcasts,
    getLatestPodcast,
    getPodcastEpisodes,
    getTopPodcasts,
    updatePodcast,
    deletePodcast,
    incrementListeners,
    incrementReports,
    createPodcast,
    getById,
    getPodcastByTag,
    getUserFavorites,
    createListPodcast,
    searchPodcatsByQuery
}