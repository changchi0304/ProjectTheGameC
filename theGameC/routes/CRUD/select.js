const express = require("express");
const page = express.Router();

const config = require("./config"); // 引用 config

/* 會員資料 */
page.get("/user/:id", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday FROM users WHERE user_id = ?;";
  config.query(
    sql,
    [req.params.id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 會員擁有遊戲資料 user_games */
page.get("/user_games/:id", (req, res) => {
  var sql = `SELECT
  users.username,
  GROUP_CONCAT(user_games.image) AS images,
  GROUP_CONCAT(games.game_name) AS games,
  GROUP_CONCAT(games.game_id) AS gameID,
  GROUP_CONCAT(user_games.coin_in_game) AS gameCoin
FROM
  user_games
  INNER JOIN users ON user_games.user_id = users.user_id
  INNER JOIN games ON user_games.game_id = games.game_id
WHERE
  users.user_id = ?
GROUP BY
  users.username
ORDER BY
  users.user_id`;
  config.query(
    sql,
    [req.params.id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 會員擁有遊戲資料 user_games */
page.get("/game_coin/:id/:game_id", (req, res) => {
  var sql = "SELECT * FROM user_games WHERE user_id = ? AND game_id = ?";
  config.query(
    sql,
    [req.params.id, req.params.game_id], // 名稱照 /: 打
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
