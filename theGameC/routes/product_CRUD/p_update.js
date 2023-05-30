const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    商品單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 修改玩家對商品的評論 product_reviews.sql */
page.put("/api/updatePR/PID/:product_id", (req, res) => {
  var sql =
    "UPDATE product_reviews SET rating = ?, comment = ? WHERE user_id = ? AND product_id = ?;";
  config.query(
    sql,
    [
      req.body.rating,
      req.body.comment,
      req.body.user_id,
      req.params.product_id,
    ],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

/* 加入購買 products.sql */
page.put("/api/addBuy/PID", (req, res) => {
  var sql = "UPDATE products SET buy_count = ? WHERE product_id = ?;";
  config.query(
    sql,
    [req.body.buy_count, req.body.product_id],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});
module.exports = page;
