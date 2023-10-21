// Core modules
import path from "node:path";

// third party modules
// calling config function to have the access of env variable all over the app
import "dotenv/config";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

// user defined modules
import config from "./config/config.js";
import { authRouter } from "./api/v1/features/auth/index.js";
import {
  loggerMiddleware,
  errorHandler,
  notFoundHandler,
  setLastVisit,
} from "../src/api/common/index.js";

const app = express();

// session configuration
const { sessionSecret, sessionTimeOut } = config;
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: sessionTimeOut,
    },
  })
);

// making public folder to accessible from anywhere
app.use(express.static("public"));

// this will help us to read req.body if coming request is in urlencoded or json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add cookie parser middleware to interact with cookies
app.use(cookieParser());

//* setting HTTP response headers.
app.use(helmet());

//* compress all responses
app.use(compression());

const apiLimiter = rateLimit({
  windowMs: 1000, //* 1 minutes
  max: 20, //* Limit each IP to 20 requests per `window` (here, per 1 minutes)
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, //* Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, //* Disable the `X-RateLimit-*` headers
  trustProxy: true, //* Trust the X-Forwarded-For header (if you're behind a proxy/load balancer)
});

//* Apply the rate limiter to all requests
app.use(apiLimiter);

// set-up for template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);

// to set last visit in cookie
app.use(setLastVisit);

// request logger middleware
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  return res.status(200).render("landing");
});

// all auth routes
app.use("/api/v1/auth", authRouter);

// all employee routes
// todo

// all review routes
// todo


// Middleware to handle 405(not allowed) error
// Api end point not found
app.use("*", notFoundHandler);

// always app level error handler will be last
app.use(errorHandler);

export default app;
