import ReviewModel from "../models/review.model.js";
import Reviews from "../../../../../lib/localDB/reviews.js";
import REVIEW_STATUS from "../../../../../constants/reviewStatus.js";

class ReviewService {
  getAllReviews = async () => {
    return Reviews.filter((review) => review.status === REVIEW_STATUS.PENDING);
  };

  getAllFeedbacks = async () => {
    return Reviews.filter((review) => review.status === REVIEW_STATUS.REVIEWED);
  };

  getAllUserReviews = async (email) => {
    return Reviews.filter(
      (review) =>
        (review.assignedBy === email || review.assignedTo === email) &&
        review.status === REVIEW_STATUS.PENDING
    );
  };

  getAllUserFeedbacks = async (email) => {
    return Reviews.filter(
      (review) =>
        (review.assignedBy === email || review.assignedTo === email) &&
        review.status === REVIEW_STATUS.REVIEWED
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

  updateReview = async (id, content) => {};
}

const reviewService = new ReviewService();

export default reviewService;
