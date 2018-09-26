const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// eslint-disable-next-line
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relations
db.comment.belongsTo(db.blog, { foreignKey: "blog_id", sourceKey: "id" });
db.blog.hasMany(db.comment, { foreignKey: "blog_id", sourceKey: "id" });
db.like.belongsTo(db.blog, { foreignKey: "blog_id", sourceKey: "id" });
db.blog.hasMany(db.like, { foreignKey: "blog_id", sourceKey: "id" });
// db.readlater.belongsTo(db.blog, {foreignKey: 'user_id', sourceKey: 'user_id'});
// db.blog.hasMany(db.readlater, {foreignKey: 'user_id', sourceKey: 'user_id'});
// db.favorites.belongsTo(db.blog, {foreignKey: 'user_id', sourceKey: 'user_id'});
// db.blog.hasMany(db.favorites, {foreignKey: 'user_id', sourceKey: 'user_id'});
db.blog.belongsTo(db.user, { foreignKey: "user_id", sourceKey: "id" });
db.user.hasMany(db.blog, { foreignKey: "user_id", sourceKey: "id" });

module.exports = db;
