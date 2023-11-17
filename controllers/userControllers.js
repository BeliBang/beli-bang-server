const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class userControllers {
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address, profilePicture } =
        req.body;

      const user = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
        profilePicture,
      });

      const access_token = signToken({ id: user.id, email: user.email });

      res.status(201).json({ access_token, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { status: 400, message: "Email is required" };
      }
      if (!password) {
        throw { status: 400, message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw { status: 401, message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token, username: user.username, role: user.role });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userControllers;
