import { v4 as uuidv4 } from "uuid";
import USER_ROLE from "../../../../../constants/userRole.js";

// User Model
let empCodeCount = 2; // because 2 emp is already registered
class UserModel {
  id = uuidv4();
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();
  lastLoggedInAt = new Date().toISOString();
  role = USER_ROLE.EMP;
  empCode = `EMP${++empCodeCount}`;

  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}

export default UserModel;
