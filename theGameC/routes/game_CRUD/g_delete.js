const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    商品單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 刪除玩家對遊戲的評論 game_reviews.sql */
page.delete("/api/DeleteGR/GID/:game_id", (req, res) => {
  var sql = "DELETE FROM game_reviews WHERE game_id = ? AND user_id = ?;";
  config.query(
    sql,
    [req.params.game_id, req.body.user_id],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

module.exports = page;
