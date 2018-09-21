/* this get the index from model and later is used
 *  to find the blog model   
 */
const db = require("../../models");

// this is the controller to list all

exports.list_all = function(req, res) {
  db.blog
    .findAndCountAll()
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

exports.blog_detail = function(req, res) {
  db.blog
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

/* this is the controller to list all blog
 on a specific  category and the amount of those blogs
*/
exports.list_Category = function(req, res) {
  db.blog
    .findAndCountAll({
      where: {
        category: req.params.category
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

/* this is the controller to list all blog
 based on title and the amount of those blogs
*/
exports.list_Title = function(req, res) {
  db.blog
    .findAndCountAll({
      where: {
        title: req.params.title
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

/* this is the controller to list all blog based on 
 *  specific  user and the amount of those blogs
 */

exports.blog_User = function(req, res) {
  db.blog
    .findAndCountAll({
      where: {
        user_id: req.params.user
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

/**create a new blog if it went well the created blog
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.New_blog = function(req, res) {
  //refactor using findorcreate instead of checking to see the titile and content exists

  db.blog
    .findOrCreate({
      where: {
        user_id: req.user.id,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
      }
    })
    .then(doc => res.send(doc))
    .catch(er => {
      res.status(500).json(er.errors);
    });
};

/**Update a blog by finding thr blog by id if it went well the created blog
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Update_blog = function(req, res) {
  let CTitle = "";
  let CCategory = "";
  let CContent = "";

  /** TODO add the a way to make update available only for the user who
   *  blogged the article     *
   */
  db.blog
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      CTitle = data.title;
      CCategory = data.category;
      CContent = data.content;
      /**
       * here we check if the there data being sent has changed or not and
       * if the blog being edited user_id match the id of the user logged in
       */
      if (req.user.id == data.user_id) {
        if (
          CTitle == req.body.title &&
          CCategory == req.body.category &&
          CContent == req.body.content
        ) {
          res
            .status(400)
            .json([
              "there seems to be no change to your blog titled " +
                req.body.title
            ]);
        } else {
          db.blog
            .update(
              {
                title: req.body.title,
                category: req.body.category,
                content: req.body.content
              },
              {
                where: {
                  id: req.params.id
                }
              }
            )
            .then(data => {
              res.json(data);
            })
            .catch(error => {
              res.json(error);
            });
        }
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      res.status(404).json(["this blog is not found"]);
    });
};

/**Delete a blog by finding thr blog by idif it went well the created blog
 * data is send back if there are error like there being empty
 * data being send it shows an error
 */

exports.Delete_blog = function(req, res) {
  /** TODO add the a way to make update available only for the user who
   *  blogged the article     *
   */
  db.blog
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      /**
       * if the blog being edited user_id match the id of the user logged in
       */
      if (req.user.id === data.user_id) {
        db.blog
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      res.status(404).json(["this blog is not found"]);
    });
};
/**
 * Add selected blog to favorite
 */

exports.Add_favorite = function(req, res) {
  /** TODO add the a way to make update available only for the user who
   *
   *  blogged the article     *
   */

  db.favorites
    .findOrCreate({
      where: {
        user_id: req.user.id,
        title: req.body.title,
        blog_id: req.body.blog_id
      }
    })
    .then(doc => res.send(doc))
    .catch(er => {
      res.status(500).json(er.errors);
    });
};

exports.get_favorite = function(req, res) {
  db.favorites
    .findAndCountAll({
      where: {
        user_id: req.user.id
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

exports.Delete_favorite = function(req, res) {
  /** TODO add the a way to make update available only for the user who
   *  blogged the article     *
   */
  db.favorites
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(doc => {
      if (doc.user_id == req.user.id) {
        db.favorites
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      res.status(404).json(["this blog is not found"]);
    });
};

exports.Add_bookmark = function(req, res) {
  db.readlater
    .findOrCreate({
      where: {
        user_id: req.user.id,
        blog_id: req.body.blog_id,
        title: req.body.title
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error.errors);
    });
};

exports.get_bookmark = function(req, res) {
  db.readlater
    .findAndCountAll({
      where: {
        user_id: req.user.id
      }
    })
    .then(data => {
      res.json(["data", data]);
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};

exports.Delete_bookmark = function(req, res) {
  /** TODO add the a way to make update available only for the user who
   *  blogged the article     *
   */

  db.readlater
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(doc => {
      if (doc.user_id == req.user.id) {
        db.readlater
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
      } else {
        res.status(401).json("Unauthorized attempt");
      }
    })
    .catch(error => {
      res.status(404).json(["this blog is not found"]);
    });
};
