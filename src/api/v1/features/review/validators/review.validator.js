import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

const reviewValidator = asyncHandler(async (req, res, next) => {
  const rules = [
    body("content").trim().notEmpty().withMessage("review message is required"),
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

export default reviewValidator;
