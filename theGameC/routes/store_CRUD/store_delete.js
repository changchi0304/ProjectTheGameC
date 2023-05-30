const express = require("express");
const page = express.Router();
const config = require("../CRUD/config");

page.post("/removeProduct", (req, res) => {
  const { userId, productId } = req.body;

  // 从购物车表中删除指定用户和产品的记录
  const deleteQuery = "DELETE FROM shopping_carts WHERE user_id = ? AND product_id = ?";
  config.query(deleteQuery, [userId, productId], (error, result) => {
    if (error) {
      console.error("删除商品失败：", error);
      res.status(500).send("服务器错误");
    } else {
      res.send("商品删除成功");
      console.log('終於刪除成功',userId,"productId:", productId);
    }
  });
});

module.exports = page;
