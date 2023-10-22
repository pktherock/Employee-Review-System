const USER_ROLE = {
  ADMIN: "ADMIN",
  EMP: "EMP",
};

Object.freeze(USER_ROLE);

const userRoles = Object.keys(USER_ROLE);

export { userRoles };

export default USER_ROLE;
