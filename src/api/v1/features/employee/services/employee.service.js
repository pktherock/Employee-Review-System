import { userService } from "../../auth/index.js";
import Users from "../../../../../lib/localDB/users.js";
import USER_ROLE from "../../../../../constants/userRole.js";

class EmployeeService {
  // I am using async keyword, letter if i use other db then it will be helpful
  getAllEmployees = async (userId) => {
    return Users.filter((user) => user.roleValue !== 777 && user.id !== userId);
  };

  createEmployee = async (empInfo) => {
    const { name, email, password } = empInfo;
    const userInfo = {
      name,
      email,
      password: password || "123456", // if admin is not filling password
    };
    const employee = await userService.createUser(userInfo);
    // console.log(employee);
    return employee;
  };

  getEmployeeById = async (userId) => {
    return await userService.getUserById(userId);
  };

  updateUser = async (userId, userInfo) => {
    return await userService.updateUser(userId, userInfo);
  };

  deleteUser = async (userId) => {
    return await userService.deleteUser(userId);
  };
}

const employeeService = new EmployeeService();

export default employeeService;
