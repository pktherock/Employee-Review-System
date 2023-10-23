import asyncHandler from "express-async-handler";
import Users from "../../../../../lib/localDB/users.js";
import { CustomError } from "../../../../common/middlewares/error.middleware.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

const isEmailExists = asyncHandler(async (req, res, next) => {
  const { emailFrom, emailTo } = req.body;

  if (emailFrom === emailTo) {
    throw new CustomError("email should not be same", STATUS_CODE.BAD_REQUEST);
  }

  let isEmailFromFound = false,
    isEmailToFound = false;
  for (let user of Users) {
    if (user.email === emailFrom) {
      isEmailFromFound = true;
    }
    if (user.email === emailTo) {
      isEmailToFound = true;
    }

    if (isEmailFromFound && isEmailToFound) break;
  }

  if (!(isEmailFromFound && isEmailToFound)) {
    throw new CustomError("Email Not found", STATUS_CODE.BAD_REQUEST);
  }

  console.log("both email exists..");
  return next();
});

export default isEmailExists;
