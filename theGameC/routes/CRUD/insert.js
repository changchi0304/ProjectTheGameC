const express = require("express");
const page = express.Router();

const config = require("./config"); // 引用 config

/* 廠商資料：該遊戲的使用者 */
page.post("/lol/login", (req, res) => {
  let account = req.body.username;
  let password = req.body.password;
  var sql = `SELECT * FROM users u JOIN user_games ug ON u.user_id = ug.user_id WHERE u.username = ? AND u.password = ? AND ug.game_id = 7`;
  config.query(sql, [account, password], function (err, results, fields) {
    if (err) {
      console.log("Error:", err);
      res.send("登入 lol 用戶出錯：", err);
      return;
    }

    if (results.length > 0) {
      // 有傳資料
      console.log("登入 lol 用戶成功:", results);
      res.send(results[0]);
    } else {
      console.log("Error:", err);
      res.send("登入 lol 用戶失敗");
    }
  });
});

module.exports = page;
