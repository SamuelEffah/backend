

const request = require("supertest")

const app = require("./../app")




describe('Podcast API', ()=>{

    it("GET /id -> array of user's podcasts", ()=>{
        return request(app)
        .get("/api/v1/podcast/512711a3-bbba-4668-b2ea-e00001e75739")
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect(res.body)
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    inserted: expect.any(String),
                    epsiodes: expect.any(Array),
                    numOfListeners: expect.any(Number),
                    numOfReports: expect.any(Number),
                    tags: expect.any(Array),
                    isPublish: expect.any(Boolean),
                    subtitle: expect.any(String),
                    posterUrl: expect.any(String)
                })
            ])
        })
     })
     it("GET /filter/tag -> filter of podcasts", ()=>{
        return request(app)
        .get("/api/v1/podcast/filter/sports")
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect(res.body)
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    inserted: expect.any(String),
                    epsiodes: expect.any(Array),
                    numOfListeners: expect.any(Number),
                    numOfReports: expect.any(Number),
                    tags: expect.any(Array),
                    isPublish: expect.any(Boolean),
                    subtitle: expect.any(String),
                    posterUrl: expect.any(String)
                })
            ])
        })
     })
  

     it("POST /check-favorite -> object", ()=>{
        return request(app)
        .post("/api/v1/podcast/check-favorite")
        .send({
            creatorId: "78d465d8-e92e-41ae-8102-ee1f85e46a22",
            podcastId: "512711a3-bbba-4668-b2ea-e00001e75739"
        })
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect(res.body)
            expect.objectContaining({
                isFavorite: expect.any(Boolean)
            })
        })
     })

     it("POST /creator/create -> object of creator", ()=>{
        return request(app)
        .post("/api/v1/podcast/check-favorite")
        .send({
            name: "Life Kit",
            description: "Calm your mind and restore your soul",
            subtitle: "",
            posterUrl: "https://images.pexels.com/photos/6740748/",
            isPublish: true,
             tags: ["sports"],
            creatorId: "78d465d8-e92e-41ae-8102-ee1f85e46a22"
        })
        .expect("Content-Type", /json/)
        .then((res)=>{
            expect(res.body)
            expect.objectContaining({
                id: expect.any(String),
                profileUrl: expect.any(URL),
                username: expect.any(String),
                fullname: expect.any(String),
                isCreator: expect.any(Boolean),
                isAdmin: expect.any(Boolean),
                podcasts: expect.any(Array),
                favorites: expect.any(Array),
                followers: expect.any(Array),
                following: expect.any(Array),
                insertedAt: expect.any(String),
                isBan: expect.any(Boolean)
            })
           
        })
     })

})