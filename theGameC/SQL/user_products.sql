-- 使用者已擁有的商品
CREATE TABLE user_products (
user_product_id INT AUTO_INCREMENT PRIMARY KEY, -- 已擁有的商品編號
user_id INT NOT NULL, -- 使用者 id
product_id INT NOT NULL, -- 已擁有的商品id
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (product_id) REFERENCES products(product_id),
UNIQUE (user_id, product_id) -- 設定此人擁有此商品為唯一
);

INSERT INTO user_products (user_id, product_id)
VALUES (1, 1), (1, 2);