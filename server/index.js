const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const { transactionsRouter } = require("./src/routes/index.route");
const PORT = process.env.PORT || 3000;
const ENDPOINT_PREFIX = "/api";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use(`${ENDPOINT_PREFIX}/transactions`, transactionsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
