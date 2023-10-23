import asyncHandler from "express-async-handler";
import reviewService from "../services/review.service.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";
class ReviewController {
  getReviewById = asyncHandler(async (req, res) => {});

  getAllReview = asyncHandler(async (req, res) => {});

  assignEmpForReview = asyncHandler(async (req, res) => {
    const { emailFrom, emailTo } = req.body;
    const { email } = req.user;
    const review = await reviewService.createReview({ emailFrom, emailTo, email });

    console.log(review);

    return res.status(STATUS_CODE.CREATED).redirect("/api/v1/employee");
  });

  updateReview = asyncHandler(async (req, res) => {});
}

const reviewController = new ReviewController();

export default reviewController;
