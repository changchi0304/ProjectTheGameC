CREATE TABLE product_promotions ( -- 商品優惠表
  promotion_id INT PRIMARY KEY AUTO_INCREMENT, -- 優惠編號
  promotion_title VARCHAR(100) NOT NULL, -- 優惠標題
  description TEXT, -- 優惠內容
  start_date DATE, -- 起始日期
  end_date DATE, -- 結束日期
  discount DECIMAL(4,2) -- 折扣 
);
-- 折扣用法 ex.
-- SELECT price * (1 - discount) AS discounted_price
-- FROM products
-- WHERE product_id = 123;