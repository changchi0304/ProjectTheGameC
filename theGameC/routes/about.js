const express = require("express");
const page = express.Router();


page.get("/", (req, res) => {
  res.render("about");
});

module.exports = page;