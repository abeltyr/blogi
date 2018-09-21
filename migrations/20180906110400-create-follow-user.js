module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("follow_users", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      follower_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      followed_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => queryInterface.dropTable("follow_users")
};
