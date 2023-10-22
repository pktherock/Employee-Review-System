import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import employeeController from "../controllers/employee.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.middleware.js";
import newEmployeeValidator from "../validators/newEmployee.validator.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.middleware.js";
const employeeRouter = Router();

employeeRouter.use(jwtAuth);
employeeRouter.get("/", isAdmin, employeeController.getAllEmployees);

employeeRouter.get(
  "/add-employee",
  isAdmin,
  isSuperAdmin,
  employeeController.getNewEmployeeForm
);

employeeRouter.post(
  "/",
  isAdmin,
  isSuperAdmin,
  newEmployeeValidator,
  employeeController.postNewEmployee
);

employeeRouter.get(
  "/:userId",
  isAdmin,
  isSuperAdmin,
  employeeController.getEmpUpdateForm
);

// due to ejs not able to write proper routing (React missing you)
employeeRouter.post(
  "/update-employee/:userId",
  isAdmin,
  isSuperAdmin,
  employeeController.updateEmployee
);

employeeRouter.delete(
  "/:userId",
  isAdmin,
  isSuperAdmin,
  employeeController.deleteEmployee
);

export default employeeRouter;
