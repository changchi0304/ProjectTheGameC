const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    商品單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* select - 商品 products.sql */
page.get("/api/productID/:product_id", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `products` WHERE product_id = ?;";
  config.query(
    sql,
    [req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 商品平均評分 product_reviews.sql */
page.get("/api/productID/:product_id/rating", (req, res) => {
  var sql =
    "SELECT SUM(rating) / COUNT(rating) AS average_rating FROM product_reviews WHERE product_id = ?;";
  config.query(
    sql,
    [req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 有多少款商品 products.sql */
page.get("/api/products_amount", (req, res) => {
  var sql = "SELECT COUNT(*) AS amount FROM products;";
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

/* 玩家 - 商品 評論 */
page.get("/api/productID/:product_id/userID/:user_id/rating", (req, res) => {
  var sql =
    "SELECT pr.*, u.nickname, u.username FROM product_reviews pr JOIN users u ON pr.user_id = u.user_id WHERE pr.user_id = ? AND pr.product_id = ? ;";
  config.query(
    sql,
    [req.params.user_id, req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(results[0]);
      }
    }
  );
});

/* 評論區 - product_reviews.sql */
page.get("/api/product_reviews/productID/:product_id", (req, res) => {
  var sql =
    "SELECT pr.rating, pr.comment, DATE_FORMAT(pr.created_at, '%Y年%m月%d日') AS created_date, u.nickname, u.avatar, u.username FROM product_reviews pr JOIN users u ON pr.user_id = u.user_id WHERE pr.product_id = ? ORDER BY pr.created_at DESC;";
  config.query(
    sql,
    [req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(results);
      }
    }
  );
});

///////////////////////////
///////////////////////////
/* 或許您也會喜歡 - products.sql */
// 依照遊戲類型
page.get("/api/product_type/:product_type", (req, res) => {
  var sql =
    "SELECT * FROM products WHERE product_type = ? ORDER BY RAND() LIMIT 3;";
  config.query(
    sql,
    [req.params.product_type], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 選擇購物車 shopping_carts.spl */
page.get("/api/join_SC/:product_id/:user_id", (req, res) => {
  var sql =
    "SELECT * FROM shopping_carts WHERE user_id = ? AND product_id = ?;";
  config.query(
    sql,
    [req.params.user_id, req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 選擇 用戶 - 商品表 user_products.spl */
page.get("/api/user_products/:product_id/:user_id", (req, res) => {
  var sql = "SELECT * FROM user_products WHERE user_id = ? AND product_id = ?;";
  config.query(
    sql,
    [req.params.user_id, req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

/* 年齡限制 users.sql、products.sql */
page.get("/api/product_ageLimit/:product_id/:user_id", (req, res) => {
  var sql =
    "SELECT TIMESTAMPDIFF(YEAR, users.birthday, CURDATE()) AS user_age, products.age_rating FROM users JOIN products ON users.user_id = ? AND products.product_id = ?;";
  config.query(
    sql,
    [req.params.user_id, req.params.product_id], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results[0]));
      }
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
///    購物車頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 購物車商品 */
page.get("/api/shopping_carts/user/:userID", (req, res) => {
  var sql =
    "SELECT shopping_carts.*, products.product_name, products.product_type, products.image FROM shopping_carts JOIN products ON shopping_carts.product_id = products.product_id WHERE shopping_carts.user_id = ?";
  config.query(
    sql,
    [req.params.userID], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 總金額 */
page.get("/api/shoppingCartsTotal/user/:userID", (req, res) => {
  var sql =
    "SELECT SUM(price) AS total_price FROM shopping_carts WHERE user_id = ?;";
  config.query(
    sql,
    [req.params.userID], // 名稱照 /: 打
    function (err, results, fields) {
      if (err) {
        res.send("出錯：", err);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

/* 選擇所有遊戲 */
page.get("/api/productAll/", (req, res) => {
  var sql =
    "SELECT *, DATE_FORMAT(created_at, '%Y年-%m月-%d日') AS formatted_created_at FROM `products`;";
  config.query(
    sql, // 名稱照 /: 打
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = page;
