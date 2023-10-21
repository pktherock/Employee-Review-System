import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const authRouter = Router();

// /api/v1/auth
authRouter.get(["/", "/login"], authController.getLogin);

authRouter.get("/register", authController.getRegister);

authRouter.post("/login", isLoggedIn, loginValidator, authController.postLogin);

authRouter.post(
  "/register",
  isLoggedIn,
  registerValidator,
  authController.postRegister
);

// note: important do not use get method to logout
authRouter.post("/logout", authController.postLogoutUser);

export default authRouter;
