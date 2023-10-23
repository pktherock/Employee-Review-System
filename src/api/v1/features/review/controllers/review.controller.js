import asyncHandler from "express-async-handler";
import reviewService from "../services/review.service.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";
import { superAdminRoleValue } from "../../../../../constants/userRole.js";
import { userService } from "../../auth/index.js";
class ReviewController {
  getReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    const { userName } = await userService.getUser(review.assignedFor);

    return res.status(STATUS_CODE.OK).render("review", { review, userName });
  });

  getAllReview = asyncHandler(async (req, res) => {
    const { roleValue, email } = req.user;
    let reviews;
    // if user is super admin return all review
    if (roleValue === superAdminRoleValue) {
      reviews = await reviewService.getAllReviews();
    } else {
      // if user is admin then return all review where assigned by is equal to admin email and assigned to also
      // if user is emp return review where assigned to equal to email
      reviews = await reviewService.getAllUserReviews(email);
    }

    // console.log(reviews);
    return res.status(STATUS_CODE.OK).render("reviews-list", { reviews });
  });

  getAllFeedback = asyncHandler(async (req, res) => {
    const { roleValue, email } = req.user;
    let feedbacks;
    // if user is super admin return all review
    if (roleValue === superAdminRoleValue) {
      feedbacks = await reviewService.getAllFeedbacks();
    } else {
      // if user is admin then return all review where assigned by is equal to admin email and assigned to also
      // if user is emp return review where assigned to equal to email
      feedbacks = await reviewService.getAllUserFeedbacks(email);
    }

    // console.log(feedbacks);
    return res.status(STATUS_CODE.OK).render("feedback-list", { feedbacks });
  });

  assignEmpForReview = asyncHandler(async (req, res) => {
    const { emailFrom, emailTo } = req.body;
    const { email } = req.user;
    const review = await reviewService.createReview({
      emailFrom,
      emailTo,
      email,
    });

    // console.log(review);

    return res.status(STATUS_CODE.CREATED).redirect("/api/v1/employee");
  });

  updateReview = asyncHandler(async (req, res) => {
    // get id and userEmail form req
    const { id } = req.params;
    const { email } = req.user;
    const { content } = req.body;
    // console.log(id, email, content);

    const review = await reviewService.updateReview(id, email, content);
    // console.log(review);

    return res.status(STATUS_CODE.REDIRECT).redirect("/api/v1/review/feedback");
  });

  deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewService.deleteReviewById(id);
    return res
      .status(STATUS_CODE.OK)
      .json({ success: true, message: "review deleted successfully!" });
  });
}

const reviewController = new ReviewController();

export default reviewController;
