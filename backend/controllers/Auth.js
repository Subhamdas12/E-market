const crypto = require("crypto");
const { User } = require("../models/User");
const { sanitizeUser } = require("../services/commons");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizeUser(user), function (err) {
          if (err) {
            res.status(400).json(err);
          } else {
            const JWT_SECRET_KEY = "SECRET_KEY";
            const token = jwt.sign(sanitizeUser(user), JWT_SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(sanitizeUser(doc));
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: req.user.id, role: req.user.role });
};
exports.checkUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
