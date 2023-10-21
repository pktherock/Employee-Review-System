import loggerMiddleware, { logger } from "./middlewares/logger.middleware.js";
import errorHandler, { CustomError } from "./middlewares/error.middleware.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import setLastVisit from "./middlewares/lastVisit.middleware.js";

export {
  loggerMiddleware,
  logger,
  errorHandler,
  notFoundHandler,
  setLastVisit,
  CustomError,
};
