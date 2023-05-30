const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

/* PI dialog 編輯 */
page.put("/updatePI/:user_id", (req, res) => {
  var sql = "UPDATE users SET phone = ?, nickname = ? WHERE user_id = ?";
  config.query(
    sql,
    [req.body.phone, req.body.nickname, req.params.user_id],
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Update PI 出錯：", err);
      } else {
        console.log("Update PI 成功:", results);
        res.send(results);
      }
    }
  );
  // console.log("req.body: ", req.body);
  // console.log("req.params.user_id: ", req.params.user_id);
});

/* recharge 儲值 */
page.put("/updateRecharge/:user_id", (req, res) => {
  var sql = "UPDATE users SET c_coin_balance = ? WHERE user_id = ?";
  config.query(
    sql,
    [req.body.c_coin_balance, req.params.user_id],
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Update recharge 出錯：", err);
      } else {
        console.log("Update recharge 成功:", results);
        res.send(req.body.c_coin_balance);
      }
    }
  );
  console.log("req.body: ", req.body);
  console.log("req.params.user_id: ", req.params.user_id);
});

/* exchange 轉點 */
page.put("/updateExchange/:user_id", (req, res) => {
  var sql = "UPDATE users SET c_coin_balance = ? WHERE user_id = ?";
  config.query(
    sql,
    [req.body.c_coin_balance, req.params.user_id],
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Update exchange 出錯：", err);
      } else {
        console.log("Update exchange 成功:", results);
        res.send(results);
      }
    }
  );
  console.log("req.body: ", req.body);
  console.log("req.params.user_id: ", req.params.user_id);
});

/* 修改 user_games 的 coin_in_game */
/* update 使用者於遊戲內 coin (user_games.sql) */
page.put("/Game_coin", (req, res) => {
  var sql =
    "UPDATE user_games SET coin_in_game = ? WHERE user_id = ? AND game_id = ?";
  config.query(
    sql,
    [req.body.coin_in_game, req.body.user_id, req.body.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Game_coin 出錯：", err);
      } else {
        console.log("Game_coin 成功:", results);
        res.send(results);
      }
    }
  );
});

/* 修改 users - avatar */
page.put("/user/avatar/:user_id", (req, res) => {
  var sql = "UPDATE users SET avatar = ? WHERE user_id = ?";
  config.query(
    sql,
    [req.body.avatar, req.params.user_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("avatar 修改 出錯：", err);
      } else {
        console.log("avatar 修改 成功:", results);
        res.send(results);
      }
    }
  );
});

module.exports = page;
