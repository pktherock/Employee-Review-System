import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
const reviewRouter = Router();

reviewRouter.post("/", reviewController.assignEmpForReview);

export default reviewRouter;
