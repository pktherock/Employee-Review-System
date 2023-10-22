import { body, validationResult } from "express-validator";
import STATUS_CODE from "../../../../../constants/statusCode.js";

const newEmployeeValidator = async (req, res, next) => {
  const rules = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLowercase()
      .withMessage("Name must be in lowercase")
      .isLength({ min: 5 })
      .withMessage("User name must be at least 5 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password")
      .trim()
      .optional()
      .isLength({ min: 6 })
      .withMessage("password must be at least length of 6"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  // if error is there then isEmpty will give false
  // todo
  if (!validationErrors.isEmpty()) {
    // this response is ok if you are creating only API
    // return res
    //   .status(400)
    //   .json({ success: false, error: validationErrors.array() });

    // If you are using ejs user should know the error
    // todo
    let errorMessage = "";
    validationErrors.array().forEach((err) => {
      errorMessage += ` ${err.msg},`;
    });

    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .render("add-employee", { message: errorMessage, success: false });
  }

  return next();
};

export default newEmployeeValidator;
