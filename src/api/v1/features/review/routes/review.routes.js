import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.middleware.js";
import { isAdmin, isSuperAdmin } from "../../employee/index.js";
import newReviewValidator from "../validators/newReview.validator.js";
import isEmailExists from "../middlewares/isEmailExists.middleware.js";
import isValidReviewer from "../middlewares/isValidReviewer.middleware.js";
import reviewValidator from "../validators/review.validator.js";
const reviewRouter = Router();

reviewRouter.use(jwtAuth);

reviewRouter.get("/", reviewController.getAllReview);
reviewRouter.get("/feedback", reviewController.getAllFeedback);

reviewRouter.post(
  "/",
  isAdmin,
  newReviewValidator,
  isEmailExists,
  reviewController.assignEmpForReview
);

reviewRouter.get("/:id", isValidReviewer, reviewController.getReviewById);

reviewRouter.post(
  "/:id",
  reviewValidator,
  isValidReviewer,
  reviewController.updateReview
);

reviewRouter.delete("/:id", isSuperAdmin, reviewController.deleteReview);

export default reviewRouter;
