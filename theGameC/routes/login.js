const express = require("express");
const page = express.Router();
const axios = require("axios");

const login_insert = require("./login_CRUD/login_insert");
const login_select = require("./login_CRUD/login_select");
const post_email = require("./login_CRUD/post_email");
const session = require("express-session");
// const on_login =  require(".//views/on_login.ejs")

page.get("/", async (req, res) => {
  let usersSelect = await axios.get(`http://localhost:80/login/last_id`);

  let userData = await axios.get(
    `http://localhost:80/user/${res.locals.LoginUserID}`
  );

  // 檢查 a 是否存在
  if (req.session.userName) {
    // 如果 a 存在，則進行頁面跳轉
    res.render("onlogin", {
      sessionName: req.session.userName,
      userData: userData.data,
    });
    return;
  }

  res.render("login", {
    userLast: usersSelect.data,
  });
});

// 清除 session
page.post("/clearSession", async (req, res) => {
  req.session.destroy();

  // 回傳一個成功訊息
  res.send("Session cleared");
});

// 綁定為 http://localhost/wallet/...
// 主要用於 wallet_CRUD
page.use("/", login_insert);
page.use("/", login_select);
page.use("/", post_email);
// page.use("/on_login", on_login);

module.exports = page;
