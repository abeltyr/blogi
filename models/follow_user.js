module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line
  const follow_user = sequelize.define(
    "follow_user",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      followed_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  // eslint-disable-next-line
  follow_user.associate = models => {
    // associations can be defined here
  };
  // eslint-disable-next-line
  return follow_user;
};
