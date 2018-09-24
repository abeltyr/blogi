const express = require("express");

const app = express.Router();
const like = require("../app/controllers/LikeController");

// import authorization middleware
const token = require("../app/middlewares/verifyToken");

app
  // apply the auth middleware
  .use((req, res, next) => token(req, res, next))

  // url for liking a blog
  .get("/like/:blog_id", like.like)

  // url for unlike
  .get("/unlike/:blog_id", like.unlike)

  // url for getting a like count for a specific blog
  .get("/likes/:blog_id", like.getLikeCount);

module.exports = app;
