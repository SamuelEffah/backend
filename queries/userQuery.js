const { PrismaClient } = require('@prisma/client');
const PodcastQuery = require("./podcastQuery")
const prisma = new PrismaClient();


const findOrCreate = async(profile,cb)=>{
    
    try {
        let user = await prisma.user.findFirst({
            where:{
                githubId: profile.id
            }
        })
        if(!user){
            let isAdmin=false;
            let isCreator=false;
            if(process.env.SAM_GITHUB_ID == profile.id){
                isAdmin= true 
                isCreator= true
            }
            let userData = {
                fullname: profile.displayName,
                username: profile.username,
                profileUrl: profile.photos[0].value,
                githubId: profile.id,
                email: profile.email,
                isAdmin,
                isCreator
              
            }
            user = await prisma.user.create({
                data:userData
            })
        }  
        cb(null, user)
    } catch (error) {
        cb(error,{})
    }   
}


const createUser = async(data)=>{
    const newUser = await prisma.user.create({
        data
    })
    return newUser
}

const getUsers = async(adminId)=>{
    const admin = await getAdmin(adminId)
    if(admin && admin.isAdmin){
        const users = await prisma.user.findMany({
            select:{
                id:true,
                githubId:true,
                profileUrl:true,
                username:true,
                fullname:true,
                isCreator:true,
                isAdmin:true,
                podcasts: true,
                favorites:{
                    select:{
                        podcast:true
                    }
                },
                followers:true,
                isBan:true,
                email:true,
                APIKey:true,
                following:true,
                insertedAt:true
            }
        })
       
        return users
    }
    
}


const getUserById = async(id)=>{
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select:{
            id:true,
            profileUrl:true,
            username:true,
            fullname:true,
            isCreator:true,
            isAdmin:true,
            favorites:{
                select:{
                    podcast:true
                }
            },
            podcasts: true,
            followers:{
                select:{
                    following:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
            }
        },
            following:{
                select:{
                    follower:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
                }
            },
            insertedAt:true
        }
    })
    return user
}


const getUserByUsername = async(username)=>{
    const user = await prisma.user.findUnique({
        where:{
            username
        },
        select:{
            id:true,
            profileUrl:true,
            username:true,
            fullname:true,
            isCreator:true,
            isAdmin:true,
            favorites:{
                select:{
                    podcast:true
                }
            },
            podcasts: true,
            followers:{
                select:{
                    following:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
            }
        },
            following:{
                select:{
                    follower:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
                }
            },
            insertedAt:true
        }
    })

    return user
}

const getUserFollowers = async(username)=>{
    const followers = await prisma.user.findUnique({
        where:{
            username,
        },
        select:{
            followers:{
                select:{
                    following:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,
                            following:true,
                            followers:true,
                            insertedAt:true

                        }
                    }
            }
            }
        }
    })

    return followers
}

const getUserFollowing= async(username)=>{
    const following = await prisma.user.findUnique({
        where:{
            username
        },
        select:{
            following:{
                select:{
                    follower:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,
                            following:true,
                            followers:true,
                            insertedAt:true

                        }
                    }
                }
            }
        }
    })

    return following
}


const getFollowInfo = async(userId, otherUserId)=>{
    const info = await prisma.follows.findFirst({
        where:{
           OR:[
               {
                   followingId: userId,
                   followerId: otherUserId  
               },
               {
                   AND:{
                       followerId: userId,
                       followingId: otherUserId,
                   }
               }

           ]
        }
    })

    return info
}


const updateUser = async(data)=>{
    const updatedUser = await prisma.user.update({
        where:{
            id: data.id
        },
        data: data.data,
        select:{
            id:true,
            profileUrl:true,
            username:true,
            fullname:true,
            isCreator:true,
            isAdmin:true,
            favorites:{
                select:{
                    podcast:true
                }
            },
            podcasts: true,
            followers:{
                select:{
                    following:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
            }
        },
            following:{
                select:{
                    follower:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
                }
            },
            insertedAt:true
        }
    })
    return updatedUser
}


const findByQuery = async(query)=>{
  
   
    const users = await prisma.user.findMany({
        where:{
            OR:[
                {
                    username:{
                        endsWith: query,
                        mode: "insensitive"
                    } 
                },
                {
                    AND:{
                        username:{
                            startsWith: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]
         
        },
        select:{
            id:true,
            profileUrl:true,
            username:true,
            fullname:true,
            isCreator:true,
            isAdmin:true,
            favorites:{
                select:{
                    podcast:true
                }
            },
            podcasts: true,
            followers:{
                select:{
                    following:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
            }
        },
            following:{
                select:{
                    follower:{
                        select:{
                            id:true,
                            profileUrl:true,
                            username:true,
                            fullname:true,
                            isCreator:true,
                            isAdmin:true,

                        }
                    }
                }
            },
            insertedAt:true
        },
        take:10
    })

    return users
}



const createBots = async(data)=>{
    const bots = await prisma.user.createMany({
    data,
    skipDuplicates: true 
    })
}


const getAdmin = async(adminId)=>{
    const admin = await prisma.user.findUnique({
        where:{
            id: adminId
        },
        select:{
            id:true,
            profileUrl:true,
            username:true,
            fullname:true,
            isCreator:true,
            isAdmin:true,
            favorites:{
                select:{
                    podcast:true
                }
            },
            podcasts: true,
            followers:true,
            following:true,
            insertedAt:true
        }      
    })
    return admin
}
const promoteToCreator = async(data)=>{
    const admin =await getAdmin(data.adminId)
    if(admin && admin.isAdmin){
        const pUser = await prisma.user.update({
            where:{
                id: data.userId
            },
            data:{
                isCreator: data.action
            },
            select:{
                id:true,
                githubId:true,
                profileUrl:true,
                username:true,
                fullname:true,
                isCreator:true,
                isAdmin:true,
                podcasts: true,
                followers:true,
                favorites:{
                    select:{
                        podcast:true
                    }
                },
                isBan:true,
                email:true,
                APIKey:true,
                following:true,
                insertedAt:true
            }
        })
        
        return pUser
    
    }
}

const banUser = async(data)=>{
    const admin =await getAdmin(data.adminId)
    if(admin && admin.isAdmin){
        const bannedUser = await prisma.user.update({
            where:{
                id: data.userId
            },
            data:{
                isBan: data.action
            },
            select:{
                id:true,
                githubId:true,
                profileUrl:true,
                username:true,
                fullname:true,
                isCreator:true,
                isAdmin:true,
                podcasts: true,
                followers:true,
                isBan:true,
                email:true,
                favorites:{
                    select:{
                        podcast:true
                    }
                },
                APIKey:true,
                following:true,
                insertedAt:true
            }
        })
        
        return bannedUser
    
    }


}

const stats = async(adminId, admin)=>{
    let adminVerify = admin ? admin : await getAdmin(adminId)
    
    if(adminVerify.isAdmin){
        const pod = await prisma.podcast.findMany()
        const user = await prisma.user.findMany()
        const reports = await prisma.report.findMany()
        if(pod && user && reports){
            t = {
                numOfUsers: user.length,
                numOfPod: pod.length,
                numOfReports: reports.length
            }
        }
    
        return t
    }

  
}


const statsCategory = async()=>{
      const sizeLH = await (await PodcastQuery.getPodcastByTag("lifestyle & health")).length
      const sizeAE = await (await PodcastQuery.getPodcastByTag("art & entertainment")).length
      const sizeNP = await (await PodcastQuery.getPodcastByTag("news & politics")).length
      const sizeSP = await (await PodcastQuery.getPodcastByTag("sports")).length
      const sizeC = await (await PodcastQuery.getPodcastByTag("comedy")).length
      const sizeBT = await (await PodcastQuery.getPodcastByTag("business & technology")).length
     
      const Categories = [
        {
          name: "lifestyle & health",
          color: "#0088FE",
          size: sizeLH
        },
      
        {
          name: "art & entertainment",
         
          color: "#00C49F",
          size: sizeAE
    
        },
        {
          name: "news & politics",
          color:"#FFBB28",
          size: sizeNP
    
        },
        {
          name: "sports",
          color: "#FF8042",
          size: sizeSP
    
        },
        {
          name: "business & technology",
          color: "#fa617d",
          size: sizeBT
    
        },
        {
            name: "comedy",
            color: "#61fa7a",
            size: sizeC
      
          },
      ];

      return Categories
    }


// TODO select following with currentActivity only
const getFollowingActivity = async(id)=>{
    const users = await prisma.user.findMany({
        where:
        {
            id
        },
        select:{
         following:true
        }

    })

    return users
}

const removeUser = async(data)=>{
    const admin =await getAdmin(data.adminId)
    if(admin && admin.isAdmin){
        const removedUser = await prisma.user.delete({
            where:{
                id: data.userId
            }
        })
       if(removedUser){
           return true 
       }
       return false
    }
}







module.exports ={
    getUserById,
    getUserByUsername,
    getUserFollowers,
    getUserFollowing,
    getUsers,
    removeUser,
    findByQuery,
    promoteToCreator,
    createBots,
    banUser,
    updateUser,
    getFollowInfo,
    createUser,
    getFollowingActivity,
    findOrCreate,
    getAdmin,
    stats,
    statsCategory
}