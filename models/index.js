import { Sequelize, DataTypes } from "sequelize";
import QuoteBlueprint from "./quote.js";
import CommentBlueprint from "./comment.js";
import path from "path";

const dbFilePath = path.join(path.resolve(), "database.sqlite");

const connection = new Sequelize({
  dialect: "sqlite",
  storage: dbFilePath,
});

const Quote = QuoteBlueprint(connection, DataTypes);
const Comment = CommentBlueprint(connection, DataTypes);

Comment.associate({ Quote });
Quote.associate({ Comment });

// connection.sync();

export { Quote, Comment };
