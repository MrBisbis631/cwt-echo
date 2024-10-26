import express from "express";
import { CommentController } from "./controllers/CommentController.js";
import { Comment } from "./models/index.js";
import { QuoteController } from "./controllers/QuoteController.js";
import { quoteRenderer, commentRenderer } from "./views/index.js";
import bodyParser from "body-parser";

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));

// controllers
const commentController = new CommentController();
const quoteController = new QuoteController();

// routes
// all quotes
app.get(
  "/",
  commentController.get(quoteRenderer, {}, { modelPayloadName: "quotes" })
);

//  see comments on one quote
app.get(
  "/:id",
  quoteController.getOne(
    commentRenderer,
    {
      include: [
        {
          model: Comment,
          as: "comments",
        },
      ],
    },
    { modelPayloadName: "quote" }
  )
);

// create a new quote
app.post("/quote", quoteController.post("/"));

// create a new comment on a quote
app.post(
  "/:id/comment",
  commentController.post((req, _) => `/${req.params.id}`)
);

// run
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
