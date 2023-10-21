import { v4 as uuidv4 } from "uuid";

// User Model
class UserModel {
  constructor(userName, email, password) {
    this.id = uuidv4();
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.lastLoggedInAt = new Date().toISOString();
    // todo add role value as employee or admin
  }
}

export default UserModel;
