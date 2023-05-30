CREATE TABLE product_orders ( -- 商品訂單資料表
  product_order_id INT AUTO_INCREMENT PRIMARY KEY, -- 商品訂單編號
  user_id INT NOT NULL, -- 購買商品的會員
  products_id JSON NOT NULL, -- 該次購買的所有商品
  total_price INT UNSIGNED NOT NULL, -- 該次購買的總金額
  credit_account VARCHAR(20) NOT NULL, -- 信用卡卡號
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 時間戳記
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
