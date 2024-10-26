import { Controller } from "./Controller.js";
import { Comment } from "../models/index.js";

export class CommentController extends Controller {
  constructor() {
    super(Comment);
  }
}
