import express from "express";
import { Comment, Quote } from "./models/index.js";
import { quoteRenderer, commentRenderer } from "./views/index.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Home page and list of top quotes
app.get("/", async (_, res) => {
  const quotes = await Quote.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Content-Type", "text/html");

  res.send(
    quoteRenderer({
      quotes,
    })
  );
});

// Page with a single quote and its comments
app.get("/:id", async (req, res) => {
  const quote = await Quote.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        as: "comments",
      },
    ],
  });

  if (!quote) {
    res.status(404).send("Quote not found");
    return;
  }

  res.header("Content-Type", "text/html");

  res.send(
    commentRenderer({
      quote,
    })
  );
});

// Create a new quote
app.post("/quote", async (req, res) => {
  const data = req.body;

  console.log(data);

  await Quote.create(data);

  res.redirect("/");
});

// Create a new comment on a quote
app.post("/:id/comment", async (req, res) => {
  const data = req.body;

  await Comment.create({
    quoteId: req.params.id,
    text: data.text,
  });

  res.redirect(`/${req.params.id}`);
});

// run
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
