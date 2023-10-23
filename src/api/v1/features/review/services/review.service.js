import ReviewModel from "../models/review.model.js";
import Reviews from "../../../../../lib/localDB/reviews.js";

class ReviewService {
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
