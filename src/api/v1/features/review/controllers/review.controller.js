import asyncHandler from "express-async-handler";

class ReviewController {
  getAllReview = asyncHandler(async (req, res) => {});

  getReviewById = asyncHandler(async (req, res) => {});

  assignEmpForReview = asyncHandler(async (req, res) => {});

  updateReview = asyncHandler(async (req, res) => {});
}

const reviewController = new ReviewController();

export default reviewController;
