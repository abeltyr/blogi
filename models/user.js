module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facebook_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  // eslint-disable-next-line
  user.associate = models => {
    // associations can be defined here
  };
  return user;
};
