'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.project.belongsTo(models.user)
      models.project.belongsToMany(models.category, { through: "categoriesProjects" })
    }
  }
  project.init({
    name: DataTypes.STRING,
    githubLink: DataTypes.STRING,
    deployLink: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};