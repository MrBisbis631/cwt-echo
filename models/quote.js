"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quote.hasMany(models.Comment, {
        foreignKey: "quoteId",
        as: "comments",
      });
    }
  }
  Quote.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quote",
    }
  );
  return Quote;
};
