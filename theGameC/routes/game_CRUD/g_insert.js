const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    遊戲單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 插入用戶對遊戲的評論 game_reviews.sql */
page.post("/api/insertGR/GID/:game_id", (req, res) => {
  var sql =
    "INSERT INTO game_reviews (game_id, user_id, rating, comment) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [req.params.game_id, req.body.user_id, req.body.rating, req.body.comment],
    function (err, results, fields) {
      console.log("---------", req.body, "------------");
      // res.send(JSON.stringify(results[0]));
      res.send(JSON.stringify(req.body));
    }
  );
});

/* 加入遊戲庫 user_games.sql */
page.post("/api/insertUG/GID/:game_id", (req, res) => {
  var sql =
    "INSERT INTO user_games (user_id, game_id, game_name, image) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [req.body.user_id, req.params.game_id, req.body.game_name, req.body.image],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
///    新遊戲單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
page.get("/api/newGamePage/Game_type", (req, res) => {
  const game_type = req.query.game_type;
  console.log("++", game_type);

  var sql = "SELECT * FROM games WHERE game_type = ?;";
  config.query(sql, [game_type], function (err, results, fields) {
    if (err) {
      res.send("出錯：", err);
    } else {
      res.send(JSON.stringify(results));
      // console.log(JSON.stringify(results));
    }
  });
});

module.exports = page;
