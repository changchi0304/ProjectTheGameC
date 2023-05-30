const express = require("express");
const page = express.Router();
const config = require("../CRUD/config");

/* 會員資料 */
const session = require("express-session");

page.get("/getProducts", (req, res) => {
  // 從資料庫中取得遊戲資料
  const query = 'SELECT * FROM products';

  config.query(query, (error, results) => {
    if (error) {
      console.error("資料庫查詢失敗：", error);
      res.status(500).send("伺服器錯誤");
    } else {
      // 將取得的遊戲資料傳遞給 EJS 檔案
      res.send(results);
    }
  });
});

// 用於獲取是否已經買了
page.get("/getOwnedProducts", (req, res) => {
  const userId = req.query.userId;
  const userProductsQuery = "SELECT * FROM user_products WHERE user_id = ?";
  config.query(userProductsQuery, [userId], (error, results) => {
    if (error) {
      console.error("Owned products query failed: ", error);
      res.status(500).send("Server error");
    } else {
      const ownedProducts = results.map((item) => item.product_id);
      console.log("Owned Products:", ownedProducts);
      res.send(ownedProducts);
    }
  });
});

page.get("/getCartItems", (req, res) => {
  const userId = req.query.userId;

  // 從購物車表中獲取用戶的購物車內容
  const cartQuery = "SELECT * FROM shopping_carts WHERE user_id = ?";
  config.query(cartQuery, [userId], (cartError, cartResults) => {
    if (cartError) {
      console.error("購物車查詢失敗：", cartError);
      res.status(500).send("伺服器錯誤");
    } else {
      const productIds = cartResults.map((item) => item.product_id);

      // 如果購物車為空，直接返回空購物車，不需要查詢產品信息
      if (productIds.length === 0) {
        res.send([]);
        return;
      }

      // 使用 productIds 獲取的產品資料
      // const productQuery = "SELECT * FROM products WHERE product_id IN (?)";
      // config.query(productQuery, [productIds], (productError, productResults) => {
         const productQuery = "SELECT * FROM products WHERE product_id IN (?)";
         config.query(productQuery, [productIds], (productError, productResults) => {
        if (productError) {
          console.error("productid產品查詢失敗：", productError);
          res.status(500).send("伺服器錯誤");
        } else {
          const cartItems = cartResults.map((cartItem) => {
          const product = productResults.find((p) => p.product_id === cartItem.product_id);
            return {
              cartItemId: cartItem.cart_item_id,
              productId: cartItem.product_id,
              productName: product.product_name,
              price: product.price,
              image: product.image,
              userId: cartItem.user_id,
            };
          });
          console.log("kkk");
          res.send(cartItems);
        }
      });
    }
  });
});

module.exports = page;
