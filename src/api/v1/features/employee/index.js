import employeeRouter from "./routes/employee.routes.js";
import isAdmin from "./middlewares/isAdmin.middleware.js";
import isSuperAdmin from "./middlewares/isSuperAdmin.middleware.js";

export { employeeRouter, isAdmin, isSuperAdmin };
