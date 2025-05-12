const express = require("express");
const apiRoutes = require("./presentation/routes");
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

module.exports = app;
