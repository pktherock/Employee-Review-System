import ReviewModel from "../models/review.model.js";
import Reviews from "../../../../../lib/localDB/reviews.js";
import REVIEW_STATUS from "../../../../../constants/reviewStatus.js";
import { CustomError } from "../../../../common/middlewares/error.middleware.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

class ReviewService {
  getReviewById = async (id) => {
    return Reviews.find((review) => review.id === id);
  };

  getAllReviews = async () => {
    return Reviews.filter(
      (review) => review.status === REVIEW_STATUS.PENDING
    ).sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    );
  };

  getAllFeedbacks = async () => {
    return Reviews.filter(
      (review) => review.status === REVIEW_STATUS.REVIEWED
    ).sort((a, b) =>
      a.reviewedOn > b.reviewedOn ? -1 : a.reviewedOn < b.reviewedOn ? 1 : 0
    );
  };

  getAllUserReviews = async (email) => {
    return Reviews.filter(
      (review) =>
        (review.assignedBy === email || review.assignedTo === email) &&
        review.status === REVIEW_STATUS.PENDING
    ).sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    );
  };

  getAllUserFeedbacks = async (email) => {
    return Reviews.filter(
      (review) =>
        (review.assignedBy === email || review.assignedTo === email) &&
        review.status === REVIEW_STATUS.REVIEWED
    ).sort((a, b) =>
      a.reviewedOn > b.reviewedOn ? -1 : a.reviewedOn < b.reviewedOn ? 1 : 0
    );
  };

  createReview = async (data) => {
    const {
      emailFrom: assignedTo,
      emailTo: assignedFor,
      email: assignedBy,
    } = data;
    const review = new ReviewModel(assignedTo, assignedFor, assignedBy);
    Reviews.push(review);
    return review;
  };

  updateReview = async (id, email, content) => {
    const reviewIdx = Reviews.findIndex((review) => review.id === id);
    if (reviewIdx === -1) {
      throw new CustomError("No Review found", STATUS_CODE.NOT_FOUND);
    }

    Reviews.splice(reviewIdx, 1, {
      ...Reviews[reviewIdx],
      reviewedBy: email,
      reviewedOn: new Date().toISOString(),
      status: REVIEW_STATUS.REVIEWED,
      content,
    });

    return Reviews[reviewIdx];
  };

  deleteReviewById = async (id) => {
    const reviewIdx = Reviews.findIndex((review) => review.id === id);
    if (reviewIdx === -1) {
      throw new CustomError("No Review found", STATUS_CODE.NOT_FOUND);
    }

    const reviewCopy = { ...Reviews[reviewIdx] };
    Reviews.splice(reviewIdx, 1);

    return reviewCopy;
  };
}

const reviewService = new ReviewService();

export default reviewService;
