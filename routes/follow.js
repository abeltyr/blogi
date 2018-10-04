const express = require("express");

const app = express.Router();
const FOLLOW = require("../app/controllers/FollowController");
const token = require("../app/middlewares/verifyToken");

app
  .use((req, res, next) => token(req, res, next))

  /**
   * this tells the number of followers the current user have
   */

  .post("/User/Followers", FOLLOW.No_Followers)

  /**
   * this tells the number of user the current user follows
   */

  .get("/Following/User", FOLLOW.Following_user)

  /**
   * this tells the number of Category the current user follows
   */

  .get("/Following/Category", FOLLOW.Following_category)

  /**
   * this is  used to follow category that is send through the post
   */

  .post("/Follow/Category", FOLLOW.Follow_category)

  /**
   * this is used to follow User that is send through the post
   */

  .post("/Follow/User", FOLLOW.Follow_user)

  /**
   * this is used to Unfollow category that is send through the post
   */

  .delete("/Unfollow/Category", FOLLOW.unfollow_category)

  /**
   * this is used to Unfollow User that is send through the post
   */

  .delete("/Unfollow/User", FOLLOW.Unfollow_user)

  /**
   * this is used to check if the category send through is followed
   * by the current authenticated user
   */

  .post("/Check/Category", FOLLOW.check_category)

  /**
   * this is used to check if the User send through is followed
   * by the current authenticated user
   */

  .post("/Check/User", FOLLOW.check_user);

module.exports = app;
