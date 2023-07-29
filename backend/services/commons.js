const passport = require("passport");

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzNhMWEzZDJlZTgxYmU5YjE0MzFlMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDY0MzgwMH0.yoj0uCuMleyA4hPS5vdCxEvslexTnPKTXFSREcO4S2w";
  return token;
};
exports.isAuth = () => {
  return passport.authenticate("jwt");
};
