import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.middleware.js";
import { isAdmin } from "../../employee/index.js";
import newReviewValidator from "../validators/newReview.validator.js";
import isEmailExists from "../middlewares/isEmailExists.middleware.js";
const reviewRouter = Router();

reviewRouter.use(jwtAuth);

reviewRouter.post(
  "/",
  isAdmin,
  newReviewValidator,
  isEmailExists,
  reviewController.assignEmpForReview
);

reviewRouter.get("/:id", reviewController.getReviewById);

reviewRouter.post("/:id", reviewController.updateReview);

export default reviewRouter;
