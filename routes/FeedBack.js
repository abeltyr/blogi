const express = require("express");

const app = express.Router();
const FEED = require("../app/controllers/FeedBackController");
const token = require("../app/middlewares/verifyToken");

app
  .use((req, res, next) => token(req, res, next))
  /**
   *  this let you comment  by sending the blog_id and the comment
   */
  .post("/New", FEED.New_comment)
  /**
   *  this let you delete the comment by sending the comment id
   */
  .delete("/Delete/:id", FEED.Delete_comment);

module.exports = app;
