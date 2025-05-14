const express = require("express");
const apiRoutes = require("./presentation/routes");
const notificationsRoutes = require("./presentation/routes/notificationsRoutes");
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);
app.use("api/notifications", notificationsRoutes);

module.exports = app;
