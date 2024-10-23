import express from "express";

const app = express();

// middlewares

// dev middlewares
if (process.env.NODE_ENV === "development") {
}

// routes
// Home page and list of top quotes
app.get("/", (_, res) => {
  res.send("Hi mom!");
});

// Create a new quote
app.post("/quote", (req, res) => {
  // Logic to create a new quote
  res.send("New quote created!");
});

// Create a new comment on a quote
app.post("/quote/:id/comment", (req, res) => {
  // Logic to create a new comment on a quote
  res.send(`New comment added to quote with id ${req.params.id}!`);
});

// run
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
