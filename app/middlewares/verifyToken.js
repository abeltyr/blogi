const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.SECRET, (err, doc) => {
      if (err) {
        res.status(401).send("invalid token provided");
      }
      req.user = doc;
      next();
    });
  } else res.status(401).send("token not provided");
}
module.exports = verifyToken;
