import { Sequelize, DataTypes } from "sequelize";
import QuoteBlueprint from "./quote.js";
import CommentBlueprint from "./comment.js";

const connection = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});


const Quote = QuoteBlueprint(connection, DataTypes);
const Comment = CommentBlueprint(connection, DataTypes);

Comment.associate({ Quote });
Quote.associate({ Comment });

// connection.sync();

export { Quote, Comment };
