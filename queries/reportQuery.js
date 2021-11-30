const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const issueReport = async(data)=>{
    const report = await prisma.report.create({
        data
    })
    return report
}


const getAllReport = async()=>{
    const reports = await prisma.report.findMany()

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