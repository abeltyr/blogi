module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      blog_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  // eslint-disable-next-line
  comment.associate = models => {
    // associations can be defined here
  };
  return comment;
};
