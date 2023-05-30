const express = require("express");
const page = express.Router();
const config = require("../CRUD/config");

page.post("/insertProduct", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const price = req.body.price;
    console.log(req.body);
  console.log("測試一下-:", userId, "productId:", productId,"price:",price);

  var sql = "INSERT INTO shopping_carts (user_id, product_id, price) VALUES (?,?,?)";

  config.query(sql,[userId, productId, price], (error, results) => {
    if (error) {
      console.error("資料庫更新失敗：", error);
      res.status(500).send({ message: "伺服器錯誤", error: error });
    } else {
      res.send({ message: '商品新增成功', productId: productId });
    }
  });
  
});

module.exports = page;
