CREATE TABLE product_reviews ( --  商品評分/評論
  product_review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL, -- 評分
  comment TEXT, -- 評論
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (product_id, user_id), -- 一個遊戲，一個會員只能評論一次
  CHECK (rating <= 5) -- 評分最多為5分
);

INSERT INTO product_reviews (product_id, user_id, rating, comment)
VALUES
  (1, 1, 4, '好遊戲，強烈推薦。'),
  (1, 3, 5, '優秀的遊戲，物超所值。'),
  (1, 4, 2, '令人失望的遊戲，不推薦。'),
  (1, 5, 4, '好玩的遊戲，畫面很棒。'),
  (1, 6, 5, '我玩過的最好的遊戲之一。'),
  (1, 7, 3, '普通遊戲，可以更好。'),
  (7, 1, 4, '好遊戲，強烈推薦。'),
  (7, 3, 5, '優秀的遊戲，物超所值。'),
  (7, 4, 2, '令人失望的遊戲，不推薦。'),
  (7, 5, 4, '好玩的遊戲，畫面很棒。'),
  (7, 6, 5, '我玩過的最好的遊戲之一。'),
  (7, 7, 3, '普通遊戲，可以更好。')