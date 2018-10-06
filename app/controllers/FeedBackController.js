const debug = require("debug")("comments");
const db = require("../../models");

exports.New_comment = (req, res) => {
  db.comment
    .findOne({
      where: {
        user_id: req.user.id,
        blog_id: req.body.blog_id
      }
    })
    .then(data => {
      if (data) {
        res.json("one comment per person");
      } else {
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
          .catch(error => {
            debug(error);
            res.status(500).json(error);
          });
      }
    })
    .catch(error => {
      debug(error);
      res.status(500).json(error);
    });
};

exports.Delete_comment = (req, res) => {
  /**
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

exports.check_comment = (req, res) => {
  db.comment
    .findOne({
      where: {
        user_id: req.user.id,
        blog_id: req.params.blog_id
      }
    })
    .then(data => {
      if (data) {
        res.json({
          commented: 1
        });
      } else {
        res.json({
          commented: 0
        });
      }
    })
    .catch(error => {
      debug(error);
      res.status(500).send("Internal Server Error");
    });
};
