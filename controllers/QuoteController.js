import { Controller } from "./Controller.js";
import { Quote } from "../models/index.js";

export class QuoteController extends Controller {
  constructor() {
    super(Quote);
  }
}
