const debug = require("debug")("app");
/* this get the index from model and later is used
 *  to find the blog model
 */
const db = require("../../models");

exports.like = (req, res) => {
  db.like
    .findOrCreate({
      where: {
        blog_id: req.body.blog_id,
        user_id: req.user_id
      }
    })
    .then(doc => {
      if (doc[1] === true) {
        res.json("you have liked the blog");
      } else {
        res.status(422).json("you have already liked the blog");
      }
    });
};

exports.unlike = (req, res) => {
  db.like.findById(req.params.like_id).then(doc => {
    if (req.user.id === doc.user_id) {
      db.like
        .destroy({
          where: {
            id: req.params.id
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
    });
};
