const {
  PORT,
  SALT_ROUNDS,
  PRODUCTION,
  SESSION_SECRET,
  SESSION_TIME_OUT,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TIME_OUT,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TIME_OUT,
  EMAIL_USER_NAME,
  EMAIL_USER_PASSWORD,
} = process.env;

const config = {
  port: Number(PORT) || 3000,
  saltRounds: Number(SALT_ROUNDS),
  production: PRODUCTION === "true",
  sessionSecret: String(SESSION_SECRET),
  sessionTimeOut: Number(SESSION_TIME_OUT),
  jwtAccessSecret: String(JWT_ACCESS_SECRET),
  jwtAccessTimeOut: String(JWT_ACCESS_TIME_OUT),
  jwtRefreshSecret: String(JWT_REFRESH_SECRET),
  jwtRefreshTimeOut: String(JWT_REFRESH_TIME_OUT),
  emailUser: String(EMAIL_USER_NAME),
  emailPass: String(EMAIL_USER_PASSWORD),
};

Object.freeze(config);

export default config;
