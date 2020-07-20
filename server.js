require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

// handle cross origin calls
app.use(cors());

// handle request body parsing
app.use(bodyParser.json());

// handle routes
app.use(
  "/api/v1", // base route
  require("./src/middlewares/requestIdGenerator").call, // req middleware
  require("./src/routes/database_route") // controller file
);

app.use(
  "/api/v1", // base route
  require("./src/middlewares/requestIdGenerator").call, // req middleware
  require("./src/routes/healthcheck_route") // controller file
);

// run app on port 3000
app.listen(port, () => {
  console.log(`app started on port: ${port}`);
});
