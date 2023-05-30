const express = require("express");
const page = express.Router();
const axios = require("axios");

page.get("/", (req, res) => {
    res.render("onlogin");
  });
  

module.exports = page;
