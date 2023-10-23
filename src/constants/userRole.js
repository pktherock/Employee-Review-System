const USER_ROLE = {
  ADMIN: "ADMIN",
  EMP: "EMP",
};

Object.freeze(USER_ROLE);

const userRoles = Object.keys(USER_ROLE);

const superAdminRoleValue = 777;

export { userRoles,superAdminRoleValue };

export default USER_ROLE;
