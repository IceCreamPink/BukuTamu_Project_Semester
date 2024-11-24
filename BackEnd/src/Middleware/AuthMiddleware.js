const jwt = require("jsonwebtoken");
const secretkey = "semesterancuyy";

const authJwt = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    const auth = token.split(" ")[1];
    jwt.verify(auth, secretkey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authJwt;
