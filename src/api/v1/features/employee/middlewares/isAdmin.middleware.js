import asyncHandler from "express-async-handler";
import USER_ROLE from "../../../../../constants/userRole.js";
import { CustomError } from "../../../../common/middlewares/error.middleware.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

const isAdmin = asyncHandler((req, res, next) => {
  const role = req.user.role;
  // console.log(role);

  if (role !== USER_ROLE.ADMIN) {
    throw new CustomError("Unauthorized Access", STATUS_CODE.FORBIDDEN);
  }

  return next();
});

export default isAdmin;
