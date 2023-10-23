import { v4 as uuidv4 } from "uuid";
import REVIEW_STATUS from "../../../../../constants/reviewStatus.js";

class ReviewModel {
  id = uuidv4();
  status = REVIEW_STATUS.PENDING;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();
  reviewedBy = "";
  reviewedOn = "";
  content = "";

  constructor(assignedTo, assignedFor, assignedBy){
    this.assignedTo = assignedTo;
    this.assignedFor = assignedFor;
    this.assignedBy = assignedBy;
  }
}

export default ReviewModel;