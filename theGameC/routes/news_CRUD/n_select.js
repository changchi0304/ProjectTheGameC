const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

/* select - 最新消息 */
page.get("/api/getlatest", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `news` WHERE news_type = '最新消息' ORDER BY news_id DESC;";

  config.query(sql, function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results));
  });
});

/* select - 遊戲更新 */
page.get("/api/getGameUpdates", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `news` WHERE news_type = '遊戲更新' ORDER BY news_id DESC;";

  config.query(sql, function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results));
  });
});

/* select - 優惠活動 */
page.get("/api/getProductsPromotions", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `news` WHERE news_type = '優惠活動' ORDER BY news_id DESC;";

  config.query(sql, function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results));
  });
});

/* select - 新品上架 */
page.get("/api/getNewProducts", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `news` WHERE news_type = '新品上架' ORDER BY news_id DESC;";

  config.query(sql, function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results));
  });
});

//------------------------------
//------------------------------
/* 分頁製作 */
// 取得每個 type 的新聞有幾份資料的總數，用來製作分頁

// 最新消息
page.get("/api/getlatest/amount", (req, res) => {
  var sql = "SELECT COUNT(*) AS total FROM news WHERE news_type = '最新消息'";

  config.query(sql, function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results));
  });
});

module.exports = page;
