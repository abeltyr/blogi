"use strict";
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    "like",
    {
      blog_id: DataTypes.INTEGER
    },
    {}
  );
  like.associate = function(models) {
    // associations can be defined here
  };
  return like;
};
