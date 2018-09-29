const express = require("express");

const app = express.Router();
const BLOG = require("../app/controllers/BlogController");

// import authorization middleware
const token = require("../app/middlewares/verifyToken");

app
  .get("/all", BLOG.list_all)

  .get("/all/Category/:category", BLOG.list_Category)

  .get("/all/Title/:title", BLOG.list_Title)

  .get("/:id", BLOG.blog_detail)

  .get("/User/:user", BLOG.blog_User)

  // apply middleware for protection

  // .use((req, res, next) => token(req, res, next))

  .post("/New", BLOG.New_blog)

  .put("/Update/:id", BLOG.Update_blog)

  .delete("/Delete/:id", BLOG.Delete_blog)

  .post("/Favorite", BLOG.Add_favorite)

  .get("/get/Favorite", BLOG.get_favorite)

  .delete("/Delete/Favorite/:id", BLOG.Delete_favorite)

  .post("/readLater", BLOG.Add_bookmark)

  .get("/get/readLater", BLOG.get_bookmark)

  .delete("/Delete/readLater/:id", BLOG.Delete_bookmark);

module.exports = app;
