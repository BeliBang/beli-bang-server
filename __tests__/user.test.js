const request = require("supertest")
const app = require("../app")
const { User, sequelize } = require("../models")
const { signToken } = require("../helpers/jwt")

let validSellerToken, validCustomerToken, invalidToken, sellerId

const dataSeller = {
  username: "Seller",
  email: "seller@mail.com",
  password: "seller",
  role: "Seller",
  phoneNumber: 12345,
  address: "Adress"
}

const dataCustomer = {
  username: "Customer",
  email: "customer@mail.com",
  password: "customer",
  role: "Customer",
  phoneNumber: 12345,
  address: "Adress"
}

beforeAll((done) => {
  User.create(dataSeller)
    .then((seller) => {
      validSellerToken = signToken({ id: seller.id, email: seller.email })
      sellerId = seller.id
      invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfE"
      done()
    })
    .catch((err) => {
      done(err)
    })
})

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  })
})

// REGISTER USER
describe("POST /register", () => {
  test("201 success registering new User", (done) => {
    request(app)
      .post("/register")
      .send(dataCustomer)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("access_token", expect.any(String))
        expect(body).toHaveProperty("role", expect.any(String))
        expect(body).toHaveProperty("id", expect.any(Number))
        validCustomerToken = body.access_token
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User without username", (done) => {
    request(app)
      .post("/register")
      .send({
        email: dataCustomer.email,
        password: dataCustomer.password,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Username is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("400 register User without email", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        password: dataCustomer.password,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("400 register User with wrong email format", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: 'wrong',
        password: dataCustomer.password,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Invalid email format")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  
  test("400 register User with duplicate email", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: dataSeller.email,
        password: dataCustomer.password,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email must be unique")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User without password", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: dataCustomer.email,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Password is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User with incorrect password length", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        password: 1234,
        email: dataCustomer.email,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Minimum password is 5 characters")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User without role", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: dataCustomer.email,
        password: dataCustomer.password,
        phoneNumber: dataCustomer.phoneNumber,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Role is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User without phone number", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: dataCustomer.email,
        password: dataCustomer.password,
        role: dataCustomer.role,
        address: dataCustomer.address
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Phone Number is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 register User without address", (done) => {
    request(app)
      .post("/register")
      .send({
        username: dataCustomer.username,
        email: dataCustomer.email,
        password: dataCustomer.password,
        role: dataCustomer.role,
        phoneNumber: dataCustomer.phoneNumber
      })
      .then((response) => {
        const { body, status } = response
 
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Address is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// LOGIN USER
describe("POST /login", () => {
  test("200 success login User", (done) => {
    request(app)
      .post("/login")
      .send({
        email: dataCustomer.email,
        password: dataCustomer.password
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("access_token", expect.any(String))
        expect(body).toHaveProperty("username", expect.any(String))
        expect(body).toHaveProperty("role", expect.any(String))
        expect(body).toHaveProperty("id", expect.any(Number))
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 login User without email", (done) => {
    request(app)
      .post("/login")
      .send({
        password: dataCustomer.password,
      })
      .then((response) => {
        const { body, status } = response
  
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Email is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("400 login User without password", (done) => {
    request(app)
      .post("/login")
      .send({
        email: dataCustomer.email
      })
      .then((response) => {
        const { body, status } = response
  
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Password is required")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 login User with incorrect email", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "wrong@mail.com",
        password: dataCustomer.password
      })
      .then((response) => {
        const { body, status } = response
  
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 login User with incorrect password", (done) => {
    request(app)
      .post("/login")
      .send({
        email: dataCustomer.email,
        password: "wrongpassword"
      })
      .then((response) => {
        const { body, status } = response
  
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

// FIND USER BY ID
describe("GET /users/:id", () => {
  test("200 success fetching User by ID", (done) => {
    request(app)
      .get(`/users/${sellerId}`)
      .set("access_token", validSellerToken)
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
  
  test("401 fetching User with invalid token", (done) => {
    request(app)
      .get(`/users/${sellerId}`)
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("401 fetching User without token", (done) => {
    request(app)
      .get(`/users/${sellerId}`)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid token")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("404 fetching User not in Database", (done) => {
    request(app)
      .get("/users/9")
      .set("access_token", validSellerToken)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "User Not Found")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})