const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const issueReport = async(data)=>{
    let reportData = {
        issuerId: data.issuerId,
        msg: data.msg,
        isResolve: false,
        podcastId: data.podcastId
    }
    const report = await prisma.report.create({
        data: reportData
    })
    if(report){
        return {issue: true, msg:"Report Sent!"}
    }
    return {issue: false, msg: "Something went wrong"}
}


const getAllReport = async()=>{
    const reports = await prisma.report.findMany({
        select:{
            issuer:{
                select:{
                    fullname:true,
                    profileUrl:true,

                }
            },
            podcast:{
                select:{
                    name:true
                }
            },
            msg: true,
            insertedAt:true
        }
    })

    return reports;
}


const resolveReport = async(action,reportId)=>{
    const resolve = await prisma.report.update({
        where:{
            id: reportId
        },
        data:{
            isResolve: action
        }
    })
    return resolve
}


const getReportByPodcastId = async(podcastId)=>{
    const reports = new prisma.report.findMany({
        where:{
            podcastId
        }
    })
    return reports
}

const deleteReport = async(id)=>{
    const deletedReport = await prisma.report.delete({
        where:{
            id
        }
    })
}


module.exports ={
    getAllReport,
    getReportByPodcastId,
    issueReport,
    deleteReport,
    resolveReport
}