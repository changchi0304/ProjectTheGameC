const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

////////////////////////////////////
//// Game_Developers 英雄聯盟 7 ////
//////////////////////////////////

/* 會員擁有遊戲資料 user_games - Select */
page.get("/api/game_coin/:user_id", (req, res) => {
  var sql = "SELECT * FROM user_games WHERE user_id = ? AND game_id = 7";
  config.query(
    sql,
    [req.params.user_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Game_coin 出錯：", err);
      } else {
        console.log("Game_coin 成功:", results);
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 會員擁有遊戲資料 user_games - Update */
page.put("/api/game_coin_pay", (req, res) => {
  var sql =
    "UPDATE user_games SET coin_in_game = ? WHERE user_id = ? AND game_id = 7";
  config.query(
    sql,
    [req.body.coin_in_game, req.body.user_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Game_coin_pay 出錯：", err);
      } else {
        console.log("Game_coin_pay 成功:", results);
        res.send(results);
      }
    }
  );
});

/* 撈取：英雄聯盟 lol - Select - skin_id by user_id */
page.get("/api/lol_skins/:user_id", (req, res) => {
  var sql = "SELECT * FROM lol WHERE user_id = ?";
  config.query(
    sql,
    [req.params.user_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Game_coin 出錯：", err);
      } else {
        console.log("Game_coin 成功:", JSON.stringify(results));
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 造型購買紀錄：英雄聯盟 lol - Insert */
page.post("/api/game_coin_insert", (req, res) => {
  var sql =
    "INSERT INTO lol (user_id, skin_id, skin_name, pay) VALUES (?, ?, ?, ?)";
  config.query(
    sql,
    [req.body.user_id, req.body.skin_id, req.body.skin_name, req.body.pay], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Game_coin_insert 出錯：", err);
      } else {
        console.log("Game_coin_insert 成功:", results);
        res.send(results);
      }
    }
  );
});

module.exports = page;
