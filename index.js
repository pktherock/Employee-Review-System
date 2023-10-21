import app from "./src/app.js";
import config from "./src/config/config.js";

const { port } = config;

const server = app.listen(port, () => {
  console.log(`Server🚀 started on http://localhost:${port}`);
});

server.on("error", (err) => {
  switch (err.code) {
    case "EACCES":
      console.error("Require elevated privileges..");
      return process.exit(1);
    case "EADDRINUSE":
      console.error(`${port} is already in use..`);
      return process.exit(1);
    default:
      throw err;
  }
});
