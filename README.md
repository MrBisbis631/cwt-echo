# Cwt Echo

Cwt Echo is a social media where you can post quotes and comment on them.

## Installation

1. Clone the repository
1. run `npm i` to install dependencies
1. run `npm run db:init` to initialize the database and run migrations
1. run `npm run db:seed` run seeder with demo quotes
1. run `npm run dev` to start the server
1. browse to `http://localhost:3000/` (or specified port) start quoting

## models

- `Quote` - A quote is with has-many `Comments`
- `Comment` - A response to a comment. Belongs to a `Quote`

## Controllers

- `QuoteController` - Handles all quote related routes
- `CommentController` - Handles all comment related routes

## Routes

Defined in `./index.js`

- `GET /` - Home page and list of top quotes
- `POST /quote` - Create a new quote
- `POST /quote/:id/comment` - Create a new comment on a quote
