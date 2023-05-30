const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

//////////////////////////////////////////////////////////////////////////////////
///    商品單頁             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 刪除玩家對商品的評論 product_reviews.sql */
page.delete("/api/DeletePR/PID/:product_id", (req, res) => {
  var sql = "DELETE FROM product_reviews WHERE product_id = ? AND user_id = ?;";
  config.query(
    sql,
    [req.params.product_id, req.body.user_id],
    function (err, results, fields) {
      console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////
///    購物車             ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/* 刪除購物車id shopping_carts.sql */
page.delete("/api/DeleteSC", (req, res) => {
  var sql = "DELETE FROM shopping_carts WHERE cart_id=? ;";
  config.query(sql, [req.body.cart_id], function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results[0]));
  });
});
/* 清空該用戶的購物車 shopping_carts.sql */
page.delete("/api/DeleteAllSC", (req, res) => {
  var sql = "DELETE FROM shopping_carts WHERE user_id = ?;";
  config.query(sql, [req.body.user_id], function (err, results, fields) {
    console.log(results[0]);
    res.send(JSON.stringify(results[0]));
  });
});
module.exports = page;
