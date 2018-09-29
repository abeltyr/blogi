const express = require("express");

const app = express.Router();
const FOLLOW = require("../app/controllers/FollowController");
const token = require("../app/middlewares/verifyToken");

app
  .use((req, res, next) => token(req, res, next))

  .post("/User/Followers", FOLLOW.No_Followers)

  .get("/Following/User", FOLLOW.Following_user)

  .get("/Following/Category", FOLLOW.Following_category)

  .post("/Follow/Category", FOLLOW.Follow_category)

  .post("/Follow/User", FOLLOW.Follow_user)

  .delete("/Unfollow/Category", FOLLOW.unfollow_category)

  .delete("/Unfollow/User", FOLLOW.Unfollow_user)

  .post("/Check/Category", FOLLOW.check_category)

  .post("/Check/User", FOLLOW.check_user);

module.exports = app;
