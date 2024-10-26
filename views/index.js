import { compileFile } from "pug";

const commentRenderer = compileFile("./views/comment.pug");
const quoteRenderer = compileFile("./views/quote.pug");

export { commentRenderer, quoteRenderer };
