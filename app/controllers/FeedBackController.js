const debug = require("debug")("comments");
const db = require("../../models");

exports.list_all = (req, res) => {
  db.comment
    .findAndCountAll({
      where: {
        blog_id: req.params.id
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(error => {
      debug(error);
      res.status(500).send("Internal Server Error");
    });
};

exports.New_comment = (req, res) => {
  db.comment
    .findOrCreate({
      where: {
        user_id: req.user.id,
        comments: req.body.comments,
        blog_id: req.body.blog_id,
        name: req.user.full_name,
        image: req.user.image
      }
    })
    .then(doc => res.send(doc))
    .catch(er => {
      res.status(500).json(er.errors);
    });
};

exports.Delete_comment = (req, res) => {
  /** TODO add the a way to make update available only for the user who
   *  blogged the article     *
   */
  db.comment
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(doc => {
      if (doc.user_id === req.user.id) {
        db.comment
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            debug(error);
            res.status(500).send("Internal Server Error");
          });
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      debug(error);
      res.status(404).json(["this blog is not found"]);
    });
};
