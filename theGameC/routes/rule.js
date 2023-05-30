const express = require("express");
const page = express.Router();
const path = require("path");


//rule_2頁面
page.get("/rule2", (req, res) => {
  res.render("rule_2");
});

page.get("/rule3", (req, res) => {
  res.render("rule_3");
});

module.exports = page;
