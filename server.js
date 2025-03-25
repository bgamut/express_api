const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel");
});
app.get("/light", (req, res) => {
  res.send("you have entered the light page");
});
app.listen(port, () => {
  `Server started on port ${port}`;
});
