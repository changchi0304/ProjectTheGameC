const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//中間區塊要抓遊戲種類圖片 資料庫：games
page.get("/game_select", (req, res) => {
  var sql =
    "SELECT game_id, game_type , image ,game_name,age_rating FROM games;";
  config.query(sql, function (err, results, fields) {
    if (err) {
      res.status(500).json({ error: "selec錯誤", details: err });
    } else {
      console.log("查詢結果：", results[0]);
      res.send(JSON.stringify(results));
    }
  });
});

//下面區塊要抓遊戲背景圖 資料庫：game_type
page.get("/game_select_bg", (req, res) => {
  var sql = "SELECT game_type_name,description, bg_image FROM game_types;";
  config.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).send("服務器有問題");
      return;
    }
    console.log("查詢結果：", results[0]);
    res.send(JSON.stringify(results));
  });
});

//////////////////////////////////////////////////////////////////////////////////
///    遊戲單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 遊戲單頁 */
page.get("/api/gameID/:game_id", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `games` WHERE game_id = ?;";
  config.query(
    sql,
    [req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 遊戲平均評分 game_reviews.sql */
page.get("/api/gameID/:game_id/rating", (req, res) => {
  var sql =
    "SELECT SUM(rating) / COUNT(rating) AS average_rating FROM game_reviews WHERE game_id = ?;";
  config.query(
    sql,
    [req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 有多少款遊戲 games.sql */
page.get("/api/games_amount", (req, res) => {
  var sql = "SELECT COUNT(*) AS amount FROM games;";
  config.query(
    sql, // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(results[0]);
      }
    }
  );
});

/* 玩家 - 遊戲 評論 */
page.get("/api/gameID/:game_id/userID/:user_id/rating", (req, res) => {
  var sql =
    "SELECT pr.*, u.nickname, u.username FROM game_reviews pr JOIN users u ON pr.user_id = u.user_id WHERE pr.user_id = ? AND pr.game_id = ? ;";
  config.query(
    sql,
    [req.params.user_id, req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(results[0]);
      }
    }
  );
});

/* 評論區 - game_reviews.sql */
page.get("/api/game_reviews/gameID/:game_id", (req, res) => {
  console.log(req.query.sort);

  var sql =
    "SELECT gr.rating, gr.comment, DATE_FORMAT(gr.created_at, '%Y年%m月%d日') AS created_date, u.nickname, u.avatar, u.username FROM game_reviews gr JOIN users u ON gr.user_id = u.user_id WHERE gr.game_id = ? ORDER BY gr.created_at DESC;";
  var sql2 =
    "SELECT gr.rating, gr.comment, DATE_FORMAT(gr.created_at, '%Y年%m月%d日') AS created_date, u.nickname, u.avatar, u.username FROM game_reviews gr JOIN users u ON gr.user_id = u.user_id WHERE gr.game_id = ? ORDER BY gr.rating DESC;";

  config.query(sql, [req.params.game_id], function (err, results1, fields) {
    if (err) {
      res.send("出錯：" + err);
    } else {
      res.send(results1);
      // config.query(
      //   sql2,
      //   [req.params.game_id],
      //   function (err, results2, fields) {
      //     if (err) {
      //       res.send("出錯：" + err);
      //     } else {
      //       res.send({ byCreated: results1, byRating: results2 });
      //     }
      //   }
      // );
    }
  });
});

/* 或許您也會喜歡 - games.sql */
// 依照遊戲類型
page.get("/api/game_type/:game_type", (req, res) => {
  var sql = "SELECT * FROM games WHERE game_type = ? ORDER BY RAND() LIMIT 3;";
  config.query(
    sql,
    [req.params.game_type], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 是否已加入遊戲 user_games.spl */
page.get("/api/user_games/:game_id/:user_id", (req, res) => {
  var sql = "SELECT * FROM user_games WHERE user_id = ? AND game_id = ?;";
  config.query(
    sql,
    [req.params.user_id, req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 年齡限制 users.sql、games.sql */
page.get("/api/game_ageLimit/:game_id/:user_id", (req, res) => {
  var sql =
    "SELECT TIMESTAMPDIFF(YEAR, users.birthday, CURDATE()) AS user_age, games.age_rating FROM users JOIN games ON users.user_id = ? AND games.game_id = ?;";
  config.query(
    sql,
    [req.params.user_id, req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 評分長條圖 */
page.get("/api/comment_chart/:game_id", (req, res) => {
  var sql =
    "SELECT  game_id, SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS rating_1, SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS rating_2, SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS rating_3, SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS rating_4, SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS rating_5 FROM game_reviews WHERE game_id = ? GROUP BY game_id;";
  config.query(
    sql,
    [req.params.game_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

module.exports = page;
