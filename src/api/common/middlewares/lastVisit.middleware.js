import { jwtRefreshDecode } from "../../../helpers/tokenDecode.js";

const setLastVisit = (req, res, next) => {
  // If cookie is set, then add a local variable with last visit time ;
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }

  if (req.session?.accessToken && req.session?.refreshToken) {
    try {
      const payload = jwtRefreshDecode(req.session.refreshToken);
      // console.log(payload);
      res.locals.userName = payload.userName;
      res.locals.role = payload.role;
    } catch (error) {
      console.log(error);
    }
  }

  // when user is visiting first time
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  });

  return next();
};

export default setLastVisit;
