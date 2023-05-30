const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

/* 會員儲值資料 */
page.get("/recharge_data/:id", (req, res) => {
  var sql =
    "SELECT * ,DATE_FORMAT(recharge_date, '%Y-%m-%d') AS Rdate FROM c_coin_recharge WHERE user_id = ?;";
  config.query(
    sql,
    [req.params.id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 會員轉點資料 */
page.get("/exchange_data/:id", (req, res) => {
  var sql = "SELECT * FROM c_coin_exchange WHERE user_id = ?;";
  config.query(
    sql,
    [req.params.id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/////////////////////////////
// Game_Developers
/////////////////////////////
/* 會員擁有遊戲資料 user_games */
// 英雄聯盟 7
page.get("/api/game_coin/:user_id", (req, res) => {
  var sql =
    "SELECT ug.*, u.username, u.nickname  FROM user_games ug JOIN users u ON ug.user_id = u.user_id WHERE ug.user_id = ? AND ug.game_id = 7";
  config.query(
    sql,
    [req.params.user_id], // 名稱照 /: 打
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
module.exports = page;
