import STATUS_CODE from "../../../../../constants/statusCode.js";
import destroySession from "../../../../../helpers/destroySession.js";
import sendEmail from "../../../../../utils/sendEmail.js";
import userService from "../services/user.service.js";
import asyncHandler from "express-async-handler";

class AuthController {
  getLogin = async (req, res) => {
    res.status(STATUS_CODE.OK).render("login", { message: null });
  };

  getRegister = async (req, res) => {
    res.status(STATUS_CODE.OK).render("register", { message: null });
  };

  postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.loginUser({ email, password });

    // set access token and refresh token in session
    const { accessToken, refreshToken } = token;
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    // if you are creating Only API then return this
    // return res
    //   .status(STATUS_CODE.OK)
    //   .json({ message: "Successfully Logged In", token });

    // If you are using ejs user should be redirected to job page
    // todo
    return res.status(STATUS_CODE.REDIRECT).redirect("/");
  });

  postRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await userService.createUser({ name, email, password });

    sendEmail(
      newUser.email,
      "Registration Successful",
      "Welcome to next generation Habit tracker app"
    );

    // if you are creating Only API then return this
    // return res
    //   .status(STATUS_CODE.CREATED)
    //   .json({ message: "user created", user: newUser });

    // If you are using ejs user should be redirected to login page
    return res.status(STATUS_CODE.REDIRECT).redirect("/api/v1/auth/login");
  });

  postLogoutUser = asyncHandler(async (req, res) => {
    await destroySession(req);
    res.clearCookie("lastVisit"); // delete cookie
    return res.status(STATUS_CODE.OK).json({ message: "logout successfully" });
  });
}

const authController = new AuthController();

export default authController;
