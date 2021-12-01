const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserQuery = require("../queries/userQuery")


const followUser= async(data)=>{
    let userData = {
        followerId: data.followerId,
        followingId: data.followingId
    }
    const followingUser = await prisma.follows.create({
        data: userData
    })
    if(followingUser){
        const user = await UserQuery.getUserById(data.followingId)
        const profile = await UserQuery.getUserById(data.followerId)
        return {youAreFollowing: true, user, profile}

    }
    return {youAreFollowing: false}

}


const unFollowUser = async(data)=>{
  
    const unfollowingUser = await prisma.follows.delete({
        where:{
            followerId_followingId:{
                followingId: data.followingId,
                followerId: data.followerId
            }
           
        }
    })

    if(unfollowingUser){

        const user = await UserQuery.getUserById(data.followingId)
        const profile = await UserQuery.getUserById(data.followerId)

        return {youAreFollowing: true, user, profile}
        
    }
   
}


const checkFollow = async(data)=>{
    const isFollowing = await prisma.follows.findFirst({
      where:{
          AND:[
              {
                  followingId: data.followingId
              },
              {
                  followerId: data.followerId
              }
          ]
      }
    
    })
    if(isFollowing){
        return {youAreFollowing: true}
    }
    return {youAreFollowing: false}
}


module.exports = {
    unFollowUser,
    followUser,
    checkFollow
}