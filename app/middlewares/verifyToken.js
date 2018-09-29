const jwt = require("jsonwebtoken");
const mo = require("moment");

function verifyToken(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.SECRET, (err, doc) => {
      if (err) {
        res.status(401).json("invalid token provided");
      }
      // todo add the expire date for the token to verify
      if (mo(doc.expired_date).diff(mo(), "seconds") <= 0) {
        res.status(401).json("the token has expired please issue a new one.");
      }
      req.user = doc;
      next();
    });
  } else res.status(401).json("token not provided");
}
module.exports = verifyToken;
