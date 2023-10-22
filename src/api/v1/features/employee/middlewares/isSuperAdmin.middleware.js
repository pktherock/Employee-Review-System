import asyncHandler from "express-async-handler";
import { userService } from "../../auth/index.js";
import { CustomError } from "../../../../common/middlewares/error.middleware.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const user = await userService.getUser(email);
  if (user.roleValue === 777) {
    return next();
  }

  throw new CustomError(
    "You are not allowed to do this",
    STATUS_CODE.FORBIDDEN
  );
});

export default isSuperAdmin;
