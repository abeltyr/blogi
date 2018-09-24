module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line
  const follow_category = sequelize.define(
    "follow_category",
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  // eslint-disable-next-line
  follow_category.associate = models => {
    // associations can be defined here
  };
  // eslint-disable-next-line
  return follow_category;
};
