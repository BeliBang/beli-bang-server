const request = require("supertest")
const app = require("../app")
const { User, Store, sequelize } = require("../models")
const { signToken } = require("../helpers/jwt")

let validSellerToken1, validSellerToken2, validCustomerToken, invalidToken, storeId

const dataSeller1 = {
  username: "Seller1",
  email: "seller1@mail.com",
  password: "seller1",
  role: "Seller",
  phoneNumber: "12345",
  address: "Adress"
}

const dataSeller2 = {
  username: "Seller2",
  email: "seller2@mail.com",
  password: "seller2",
  role: "Seller",
  phoneNumber: "12345",
  address: "Adress"
}

const dataCustomer = {
  username: "Customer",
  email: "customer@mail.com",
  password: "customer",
  role: "Customer",
  phoneNumber: "12345",
  address: "Adress"
}

const dataStore = {
  name: "Store",
  status: true,
  description: "Description",
  imageUrl: "image"
}

beforeAll((done) => {
  User.create(dataSeller1)
    .then((seller1) => {
      validSellerToken1 = signToken({ id: seller1.id, email: seller1.email })
      dataStore.UserId = seller1.id
      return Store.create(dataStore)
    })
    .then((store) => {
      storeId = store.id
      return User.create(dataSeller2)
    })
    .then((seller2) => {
      validSellerToken2 = signToken({ id: seller2.id, email: seller2.email })
      return User.create(dataCustomer)
    })
    .then((customer) => {
      validCustomerToken = signToken({ id: customer.id, email: customer.email })
      invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfE"
      done()
    })
    .catch((err) => {
      done(err)
    })
})

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Stores", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  })
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  })
})

// SHOW ALL STORES
describe("GET /stores", () => {
  test("200 success get all Stores", (done) => {
    request(app)
      .get("/stores")
      .set("access_token", validCustomerToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBeGreaterThan(0)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 get Stores with invalid token", (done) => {
    request(app)
      .get("/stores")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 get Stores without token", (done) => {
    request(app)
      .get("/stores")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  // test("404 no available Store nearby", (done) => {
  //   request(app)
  //     .get("/stores")
  //     .set("access_token", validCustomerToken)
  //     .then((response) => {
  //       const { body, status } = response
 
  //       expect(status).toBe(404)
  //       expect(body).toHaveProperty("message", "Sorry, there is no available store near your area")
  //       done()
  //     })
  //     .catch((err) => {
  //       done(err)
  //     })
  // })
})

// FIND STORE BY ID
describe("GET /stores/:id", () => {
  test("200 success GET Store by ID", (done) => {
    request(app)
      .get(`/stores/${storeId}`)
      .set("access_token", validCustomerToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 get Store with invalid token", (done) => {
    request(app)
      .get(`/stores/${storeId}`)
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 get Store without token", (done) => {
    request(app)
      .get(`/stores/${storeId}`)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 get Store not in database", (done) => {
    request(app)
      .get("/stores/99")
      .set("access_token", validCustomerToken)
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "Store Not Found")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// SHOW USER'S STORE
describe("GET /stores/seller", () => {
  test("200 success GET user's store", (done) => {
    request(app)
      .get("/stores/seller")
      .set("access_token", validSellerToken1)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 get Store with invalid token", (done) => {
    request(app)
      .get("/stores/seller")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 get Store without token", (done) => {
    request(app)
      .get("/stores/seller")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("403 get Store with customer role", (done) => {
    request(app)
      .get("/stores/seller")
      .set("access_token", validCustomerToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(403)
        expect(body).toHaveProperty("message", "Forbidden for the seller")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 get Store not in database", (done) => {
    request(app)
      .get("/stores/seller")
      .set("access_token", validSellerToken2)
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "You have not registered a store")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// CREATE STORE
describe("POST /stores", () => {
  test("201 success POST new Store", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", validSellerToken2)
      .send({
        name: "Store2",
        description: "Description2"
      })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(201)
        expect(body).toHaveProperty("message", "Success creating store")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 create Store without name", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", validSellerToken2)
      .send({ description: "Description2" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Name is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("400 create Store without description", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", validSellerToken2)
      .send({ name: "Store2" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Description is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("400 create Store without image", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", validSellerToken2)
      .send({
        name: "Store2",
        description: "Description2"
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Image store is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 create Store with duplicate User ID", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", validSellerToken2)
      .send({
        name: "Store2",
        description: "Description2"
      })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "You already have a store")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 create Order with invalid token", (done) => {
    request(app)
      .post("/stores")
      .set("access_token", invalidToken)
      .send({
        name: "Store2",
        description: "Description2"
      })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 create Order without token", (done) => {
    request(app)
      .post("/stores")
      .send({
        name: "Store2",
        description: "Description2"
      })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("403 create Store with customer role", (done) => {
    request(app)
      .get("/stores")
      .set("access_token", validCustomerToken)
      .send({
        name: "Store2",
        description: "Description2"
      })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(403)
        expect(body).toHaveProperty("message", "Forbidden for the seller")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// UPDATE STORE
describe("PUT /stores/:id", () => {
  test("200 success UPDATE Store by ID", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validSellerToken1)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "Success updating store information")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("200 success UPDATE Store without image", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validSellerToken1)
      .send({ description: "Update description" })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "Success updating store information")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 update Store with invalid token", (done) => {
    request(app)
    .put(`/stores/${storeId}`)
      .set("access_token", invalidToken)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 update Store without token", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("403 update Store without Seller role", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validCustomerToken)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Forbidden for the owner")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("403 update Store with incorrect User ID", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validSellerToken2)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Forbidden for the owner")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 update Store not in Database", (done) => {
    request(app)
      .put("/stores/99")
      .set("access_token", validSellerToken1)
      .send({ description: "Update description" })
      .attach("imageUrl", "")
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Store Not Found")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 update Store without image and not in Database", (done) => {
    request(app)
      .put("/stores/99")
      .set("access_token", validSellerToken1)
      .send({ description: "Update description" })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Store Not Found")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 update Store without image and name", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validSellerToken1)
      .send({ description: "Update description" })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Name is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 update Store without image and description", (done) => {
    request(app)
      .put(`/stores/${storeId}`)
      .set("access_token", validSellerToken1)
      .send({ name: "Update name" })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Description is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// DELETE STORE BY ID
describe("DELETE /stores/:id", () => {
  test("401 delete Store with invalid token", (done) => {
    request(app)
      .delete(`/stores/${storeId}`)
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("401 delete Store without token", (done) => {
    request(app)
      .delete(`/stores/${storeId}`)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("403 delete Store with incorrect User ID", (done) => {
    request(app)
      .delete(`/stores/${storeId}`)
      .set("access_token", validSellerToken2)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Forbidden for the owner")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 delete Store not in Database", (done) => {
    request(app)
      .delete("/stores/99")
      .set("access_token", validSellerToken1)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Store Not Found")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("200 success DELETE Store by ID", (done) => {
    request(app)
      .delete(`/stores/${storeId}`)
      .set("access_token", validSellerToken1)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "Store has been deleted")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})