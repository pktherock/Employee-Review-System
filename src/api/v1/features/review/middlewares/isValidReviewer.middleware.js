import asyncHandler from "express-async-handler";
import reviewService from "../services/review.service.js";
import { CustomError } from "../../../../common/middlewares/error.middleware.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

const isValidReviewer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { email, roleValue } = req.user;
  if (roleValue === 777) return next();
  
  // match with logged in user with review object into our local db;
  const review = await reviewService.getReviewById(id);
  if (!(review && review.assignedTo === email)) {
    throw new CustomError("Unauthorized Access", STATUS_CODE.FORBIDDEN);
  }

  return next();
});

export default isValidReviewer;
