const jwt = require("jsonwebtoken");
const time = require("moment");

function verifyToken(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.SECRET, (err, doc) => {
      if (err) {
        res.status(401).send("invalid token provided");
      }
      // todo add the expire date for the token to verify
      if (time(doc.expired_date) < time().now()) {
        res.status(401).send("the token has expired");
      }
      req.user = doc;
      next();
    });
  } else res.status(401).send("token not provided");
}
module.exports = verifyToken;
