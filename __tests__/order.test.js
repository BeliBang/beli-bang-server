const request = require("supertest");
const app = require("../app")
const { User, Order } = require("../models")
const { signToken } = require("../helpers/jwt");

const userSeller = {
  username: "Seller",
  email: "seller@mail.com",
  password: "seller",
  role: "Seller",
  phoneNumber: 12345,
  address: "Test",
  profilePicture: "image"
}

const userCustomer = {
  username: "Customer",
  email: "customer@mail.com",
  password: "customer",
  role: "Customer",
  phoneNumber: 12345,
  address: "Test",
  profilePicture: "image"
}

const storeTest = {
  name: "Store",
  description: "description",
  UserId: 1,
  imageUrl: "image"
}


beforeAll((done) => {
  User.create(userSeller)
    .then((seller) => {
      validToken = signToken({
        id: seller.id,
        email: seller.email,
      });
      invalidToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfE";
      return User.create(userTest2);
    })
    .then((registeredUser2) => {
      validToken2 = signToken({
        id: registeredUser2.id,
        email: registeredUser2.email,
      });
      return Hero.bulkCreate(
        [
          {
            "name": "Paquito",
            "type": "Fighter",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg",
          },
          {
            "name": "Barats",
            "type": "Tank",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/AB/Cq2Ixl-_iUCAQOs3AALNya38dwM674.jpg",
          },
          {
            "name": "Yu Zhong",
            "type": "Fighter",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg",
          },
          {
            "name": "Luo Yi",
            "type": "Mage",
            "imageUrl": "https://img.mobilelegends.com/group1/M00/00/A7/Cq2Ixl7shFWAJ73nAAF5owmcBqA347.jpg",
          }
        ],
        {
          ignoreDuplicates: true,
        }
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});