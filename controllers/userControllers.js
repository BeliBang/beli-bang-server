const { comparePassword } = require('../helpers/bcrypt');
const imageKit = require('../helpers/imageKit');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class userControllers {
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      const access_token = signToken({ id: user.id, email: user.email });

      res.status(201).json({ access_token, role: user.role, id: user.id });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { status: 400, message: 'Email is required' };
      }
      if (!password) {
        throw { status: 400, message: 'Password is required' };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw { status: 401, message: 'Invalid email/password' };
      }

      const access_token = signToken({ id: user.id, email: user.email });
      res
        .status(200)
        .json({ access_token, username: user.username, role: user.role, id: user.id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { status: 404, message: "User Not Found" };
      }
      res.status(200).json(user);
    } catch (error) {}
  }

  static async editProfilePicture(req, res, next) {
    try {
      if (!req.file) {
        throw { status: 400, message: "Profile Picture is required" };
      }

      await imageKit.upload(
        {
          file: req.file.buffer.toString('base64'),
          fileName: `${Date.now()}_${req.file.originalname}`,
          folder: 'BB_User',
          useUniqueFileName: false,
        },
        async function (err, fileResponse) {
          if (err) {
            return res.status(500).json({
              message: 'Error occured during photo upload. Please try again.',
            });
          }
          const id = req.user.id;
          const user = await User.findByPk(id);
          if (!user) {
            throw { status: 404, message: 'User Not Found' };
          }
          await user.update({ profilePicture: fileResponse.url });

          res.status(200).json({ message: 'Success Edit Profile Picture' });
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userControllers;
