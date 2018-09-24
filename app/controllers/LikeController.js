const debug = require("debug")("app");
/* this get the index from model and later is used
 *  to find the blog model
 */
const db = require("../../models");

exports.like = (req, res) => {
  db.like
    .findOrCreate({
      where: {
        blog_id: req.params.blog_id,
        user_id: req.user.id
      }
    })
    .then(doc => {
      if (doc[1] === true) {
        res.json("you have liked the blog");
      } else {
        res.status(422).json("you have already liked the blog");
      }
    })
    .catch(error => {
      debug(error);
      res.status(500).send("Internal Server Error");
    });
};

exports.unlike = (req, res) => {
  db.like
    .findById(req.params.blog_id)
    .then(doc => {
      if (req.user.id === doc.user_id) {
        db.like
          .destroy({
            where: {
              id: req.params.blog_id
            }
          })
          .then(dat => {
            res.json(dat);
          })
          .catch(error => {
            debug(error);
            res.json(error);
          });
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      debug(error);
      res.status(500).send("Internal Server Error");
    });
};
exports.getLikeCount = (req, res) => {
  db.like
    .findAndCountAll({
      where: {
        blog_id: req.params.blog_id
      }
    })
    .then(doc => {
      res.json(doc.count);
    })
    .catch(error => {
      debug(error);
      res.status(500).send("Internal Server Error");
    });
};
