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
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
