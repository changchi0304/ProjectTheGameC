CREATE TABLE product_types ( -- 商品類型資料表
 product_type_id INT AUTO_INCREMENT PRIMARY KEY, -- 商品類型 id
 product_type_name VARCHAR(20) NOT NULL, -- 商品類型名稱
 bg_image VARCHAR(255) -- 背景圖片
);

INSERT INTO product_types (product_type_name) 
VALUES ('動作'),
       ('冒險'),
       ('模擬'),
       ('策略'),
       ('運動與競技')