

const request = require("supertest")

const app = require("./../app")



describe('Episode API', ()=>{

    it("GET /id -> object of episode", ()=>{
        return request(app)
        .get("/api/v1/episodes/23")
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect.objectContaining()
        })
     })
     it("POST /creator/create -> object of podcast", ()=>{
        return request(app)
        .post("/api/v1/episodes/creator/create")
        .send({
            name: "Blue Moon",
            description: "Beyond space and time",
            fileName: "fileName",
            podcastId: "512711a3-bbba-4668-b2ea-e00001e75739"
        })
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect(res.body)
            expect.arrayContaining()
        })
     })


})