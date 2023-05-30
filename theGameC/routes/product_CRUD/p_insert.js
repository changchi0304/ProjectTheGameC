const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    商品單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 插入玩家對商品的評論 product_reviews.sql */
page.post("/api/insertPR/PID/:product_id", (req, res) => {
  var sql =
    "INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [
      req.params.product_id,
      req.body.user_id,
      req.body.rating,
      req.body.comment,
    ],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 商品加入購物車 */
page.post("/api/insertSC/PID/:product_id", (req, res) => {
  var sql =
    "INSERT INTO shopping_carts (user_id, product_id, price) VALUES (?, ?, ?);";
  config.query(
    sql,
    [req.body.user_id, req.params.product_id, req.body.price],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 使用者擁有商品 user_products */
page.post("/api/user_products", (req, res) => {
  var sql = "INSERT INTO user_products (user_id, product_id) VALUES (?, ?);";
  config.query(
    sql,
    [req.body.user_id, req.body.product_id],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 商品訂單 product_orders */
page.post("/api/product_orders", (req, res) => {
  var sql =
    "INSERT INTO product_orders (user_id, products_id, total_price, credit_account) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [
      req.body.user_id,
      req.body.products_id,
      req.body.total_price,
      req.body.credit_account,
    ],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

module.exports = page;
