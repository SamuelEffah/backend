
const request = require("supertest")

const app = require("./../app")


describe('User API', ()=>{
    it("GET /username -> user object", ()=>{
        return request(app)
        .get("/api/v1/users/sam")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            expect(response.body.length == 1)
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
            })
        })
    })

    it("GET /username/following -> array of users", ()=>{
       return request(app)
       .get("/api/v1/users/sam/following")
       .expect("Content-Type", /json/)
       .expect(200)
       .then((response)=>{
           expect(response.body)
           expect.arrayContaining()
       })
    })

    it("GET /username/followers -> array of users", ()=>{
        return request(app)
        .get("/api/v1/users/sam/followers")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            expect.arrayContaining()
        })
     })
    


    it("GET /:username/following/activity -> array of users", ()=>{
        return request(app)
        .get("/api/v1/users/sam/followers")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            expect.arrayContaining()
        })
     })

     
    it("GET /top-creators -> array of users", ()=>{
        return request(app)
        .get("/api/v1/users/podcast/top-creators")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            expect.arrayContaining()
        })
     })

     
    it("POST /following-user -> object", ()=>{
        return request(app)
        .post("/api/v1/users/following-user")
        .send({
           followerId: "e8941290-5be7-4086-b39a-0756cf227b6c",
           followingId: "512711a3-bbba-4668-b2ea-e00001e75739"
        })
        .expect("Content-Type", /json/)
        .then((response)=>{
            expect(response.body)
            expect(response.body.length > 1)
            expect.objectContaining()
            
        })
     })

     it("POST /profile/edit ->  400 if empty data", ()=>{
        return request(app)
        .post("/api/v1/users/profile/edit")
        .send({
          
        })
       .expect(400)
        
     })
     
     
    it("GET /admin/id -> user object", ()=>{
        return request(app)
        .get("/api/v1/users/admin/sdfsa")
        .expect("Content-Type", /json/)
        .expect(400)
  
     })

          
    it("GET /admin/allusers/:id -> array of users", ()=>{
        return request(app)
        .get("/api/v1/users/admin/allusers/watermelon")
        .expect("Content-Type", /json/)
        
     })

     

     it("POST /admin/delete/user -> deleted user", ()=>{
        return request(app)
        .post("/api/v1/users/admin/delete/user")
        .send({
            adminId: "e8941290-5be7-4086-b39a-0756cf227b6c",
           userId: "512711a3-bbba-4668-b2ea-e00001e75739"
        })
        .expect("Content-Type", /json/)
        .then((response)=>{
            expect(response.body)
            expect.arrayContaining()
        })
        
     })

     it("POST /admin/ban/user -> ban user", ()=>{
        return request(app)
        .post("/api/v1/users/admin/ban/user")
        .send({
            adminId: "e8941290-5be7-4086-b39a-0756cf227b6c",
           userId: "512711a3-bbba-4668-b2ea-e00001e75739",
           action: true
        })
        .expect("Content-Type", /json/)
        .then((response)=>{
            expect(response.body)
            expect.arrayContaining()
        })
        
     })
})

