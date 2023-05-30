const express = require("express");
const page = express.Router();
const axios = require("axios");
const store_select = require("./store_CRUD/store_select");
const store_insert = require("./store_CRUD/store_insert");
const store_delete = require("./store_CRUD/store_delete");
const session = require("express-session");


page.get("/", async (req, res) => {
  // 從資料庫中取得遊戲資料
  let gamesSelect = await axios.get(`http://localhost:80/store/getProducts`);
  var a = req.session.userName
  console.log(req.session.userName);

  res.render("store", { 
    userId: req.session.userId,
    games: gamesSelect.data,
    isUserLoggedIn: res.locals.LoginUserID ? true : false
  });
});




// 綁定為 http://localhost/store/...
page.use("/", store_select);
page.use("/", store_insert);
page.use("/", store_delete);

module.exports = page;
