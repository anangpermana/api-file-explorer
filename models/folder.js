'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // A folder can have many subfolders (self-referencing relationship)
      Folder.hasMany(models.Folder, {
        as: 'subfolders', // Alias for accessing subfolders
        foreignKey: 'parent_id', // Parent folder ID
      });

      // A folder belongs to a parent folder (self-referencing relationship)
      Folder.belongsTo(models.Folder, {
        as: 'parent', // Alias for accessing the parent folder
        foreignKey: 'parent_id',
      });

      // A folder can have many files
      Folder.hasMany(models.File, {
        as: 'files', // Alias for accessing files in the folder
        foreignKey: 'folder_id', // Foreign key in the File table
      });
    }
  }
  Folder.init({
    name: DataTypes.STRING,
    parent_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};