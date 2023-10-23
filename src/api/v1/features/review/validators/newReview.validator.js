import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";


const newReviewValidator = asyncHandler(async (req, res, next) => {
  const rules = [
    body("emailFrom")
      .trim()
      .notEmpty()
      .withMessage("emailFrom is required")
      .isEmail()
      .withMessage("emailFrom is invalid"),
    body("emailTo")
      .trim()
      .notEmpty()
      .withMessage("emailTo is required")
      .isEmail()
      .withMessage("emailTo is invalid"),

  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  // if error is there then isEmpty will give false
  // todo
  if (!validationErrors.isEmpty()) {
    // this response is ok if you are creating only API
    return res
      .status(400)
      .json({ success: false, error: validationErrors.array() });
  }

  return next();
});

export default newReviewValidator;