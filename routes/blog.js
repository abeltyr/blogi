const express = require("express");

const app = express.Router();
const BLOG = require("../app/controllers/BlogController");

// import authorization middleware
const token = require("../app/middlewares/verifyToken");

app
  /**
   *  send all the blogs
   */
  .get("/all", BLOG.list_all)
  /**
   * send all the blogs of the selected category
   */
  .get("/all/Category/:category", BLOG.list_Category)
  /**
   * send all the blogs of the selected title
   */
  .get("/all/Title/:title", BLOG.list_Title)
  /**
   * sends the detail of the blog which blog id is
   * send in parameters
   */
  .get("/:id", BLOG.blog_detail)
  /**
   * send all the blogs of the selected user
   */
  .get("/User/:user", BLOG.blog_User)

  // apply middleware for protection

  .use((req, res, next) => token(req, res, next))
  /**
   * if authenticated the user can add a new blog by the route below
   */
  .post("/New", BLOG.New_blog)
  /**
   * if authenticated the user can update his own blog by the route below
   */
  .put("/Update/:id", BLOG.Update_blog)
  /**
   * if authenticated the user can delete his own blog by the route below
   */
  .delete("/Delete/:id", BLOG.Delete_blog)
  /**
   * if authenticated add blog to Favorite
   */
  .post("/Favorite", BLOG.Add_favorite)
  /**
   * if authenticated get all blog that are in his/her Favorite
   */
  .get("/get/Favorite", BLOG.get_favorite)
  /**
   * if authenticated delete the blog from his/her Favorite
   */
  .delete("/Delete/Favorite/:id", BLOG.Delete_favorite)
  /**
   * if authenticated add blog to readLater
   */
  .post("/readLater", BLOG.Add_bookmark)
  /**
   * if authenticated get all blog that are in his/her readLater
   */
  .get("/get/readLater", BLOG.get_bookmark)
  /**
   * if authenticated delete the blog from his/her readLater
   */
  .delete("/Delete/readLater/:id", BLOG.Delete_bookmark);

module.exports = app;
