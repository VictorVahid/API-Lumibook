const cors = require("cors");
const express = require("express");
const apiRoutes = require("./presentation/routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

module.exports = app;
