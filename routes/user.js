// require express and init the mini app
const express = require("express");
const debug = require("debug")("user");
const moment = require("moment");

const app = express.Router();

// require passport and the facebook strategy
const passport = require("passport");
const PassportFb = require("passport-facebook");
const PassportGo = require("passport-google-oauth").OAuth2Strategy;

// const passport_google = require('')
// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require the models
const db = require("../models");

// facebook strategy
passport.use(
  new PassportFb(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://ethblogi1.herokuapp.com/user/facebook/callback",
      profileFields: ["id", "displayName", "photos", "link", "email"]
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }
  )
);
// google strategy
passport.use(
  new PassportGo(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: "https://ethblogi1.herokuapp.com/user/google/callback"
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

// login link for google /user/google/login
app.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// login link /user/facebook/login
app.get("/facebook/login", passport.authenticate("facebook"));

// facebook callback
app.get("/facebook/callback", (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate(
    "facebook",
    {
      scope: ["email", "public_profile"],
      authType: "rerequest"
    },
    // eslint-disable-next-line
    (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect("/user/login");
      db.user
        .findOrCreate({
          where: {
            facebook_id: user.id
          }
        })
        .then(doc => {
          db.user
            .update(
              {
                full_name: user.displayName,
                email: "null",
                image: user.photos[0].value
              },
              {
                where: {
                  id: doc[0].id
                }
              }
            )
            .then(() => {
              const body = {
                facebook_id: user.id,
                full_name: user.displayName,
                image: user.photos[0].value,
                email: "null"
              };
              return res.json({
                access_token: jwt.sign(body, process.env.SECRET),
                type: "Bearer"
              });
            });
        })
        .catch(error => {
          debug(error);
          res.status(500).json(err);
        });
    }
  )(req, res, next);
});

// google callback

app.get("/google/callback", (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/user/login");
    db.user
      .findOrCreate({
        where: {
          google_id: user.id
        }
      })
      .then(doc => {
        db.user
          .update(
            {
              full_name: user.displayName,
              // eslint-disable-next-line no-underscore-dangle
              image: user._json.image.url,
              email: user.emails[0].value
            },
            {
              where: {
                id: doc[0].id
              }
            }
          )
          .then(() => {
            const body = {
              id: doc[0].id,
              google_id: user.id,
              full_name: user.displayName,
              // eslint-disable-next-line no-underscore-dangle
              image: user._json.image.url,
              email: user.emails[0].value,
              issued_date: Date(),
              expired_date: Date() // add the expire date for the token from the env
            };
            return res.json({
              access_token: jwt.sign(body, process.env.SECRET),
              type: "Bearer"
            });
          });
      })
      .catch(error => {
        debug(error);
        return res.status("500").json("internal server error");
      });
  })(req, res, next);
});

module.exports = app;
