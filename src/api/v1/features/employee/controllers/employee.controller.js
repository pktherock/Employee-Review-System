import asyncHandler from "express-async-handler";
import employeeService from "../services/employee.service.js";
import STATUS_CODE from "../../../../../constants/statusCode.js";

class EmployeeController {
  getAllEmployees = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    // get all employees
    const employees = await employeeService.getAllEmployees(userId);

    // return empLists view with all emp
    return res.status(STATUS_CODE.OK).render("employeeLists", { employees });
  });

  getNewEmployeeForm = asyncHandler((req, res) => {
    return res
      .status(STATUS_CODE.OK)
      .render("add-employee", { message: null, success: null });
  });

  postNewEmployee = asyncHandler(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body);
    // return res.status(STATUS_CODE.CREATED).json(employee);
    return res.status(STATUS_CODE.CREATED).render("add-employee", {
      message: null,
      success: "employee successfully created and password is 123456",
    });
  });

  getEmpUpdateForm = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const employee = await employeeService.getEmployeeById(userId);
    return res
      .status(STATUS_CODE.OK)
      .render("update-employee", { message: null, success: false, employee });
  });

  updateEmployee = asyncHandler(async (req, res) => {
    const { name, email, empType } = req.body;
    const { userId } = req.params;
    const updatedUser = await employeeService.updateUser(userId, {
      name,
      email,
      empType
    });
    // console.log(updatedUser);

    // return res.status(STATUS_CODE.OK).json(updatedUser);
    return res.status(STATUS_CODE.OK).redirect("/api/v1/employee");
  });

  deleteEmployee = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const deletedUser = await employeeService.deleteUser(userId);
    // console.log(deletedUser);
    return res
      .status(STATUS_CODE.OK)
      .json({ success: true, message: "user deleted successfully" });
  });
}

const employeeController = new EmployeeController();

export default employeeController;
