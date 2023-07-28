const express = require("express");
const server = express();
const mongoose = require("mongoose");
const authsRouter = require("./routes/Auths");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const crypto = require("crypto");
const { User } = require("./models/User");
const { sanitizeUser, cookieExtractor } = require("./services/commons");
const cookieParser = require("cookie-parser");
//session middlewares
server.use(cookieParser());
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

//middlewares
server.use(express.json());
server.use("/auths", authsRouter.router);

//passport strategies

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "Invalid credentials" });
    }
    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, { message: "invalid credentials" });
        }
        const token = jwt.sign(sanitizeUser(user), JWT_SECRET_KEY);
        return done(null, { id: user.id, role: user.role, token });
      }
    );
  })
);

const opts = {};
const JWT_SECRET_KEY = "SECRET_KEY";
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = JWT_SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      console.log(jwt_payload);
      const user = await User.findById(jwt_payload.id);
      if (user) {
        done(null, { id: user.id, role: user.role });
      } else {
        done(null, false);
      }
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

server.listen(8080, () => {
  console.log("Server started at port 8080");
});
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Emarket");
  console.log("Connected to database");
}
