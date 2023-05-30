CREATE TABLE c_coin_exchange ( -- C幣轉換表
  exchange_id INT PRIMARY KEY AUTO_INCREMENT, -- C幣轉換單號id
  user_id INT NOT NULL, -- 會員名稱
  game_id INT NOT NULL, -- c幣轉進的遊戲編號
  game_name VARCHAR(20) NOT NULL, -- c幣轉進遊戲名稱
  c_coin_out INT NOT NULL, -- c幣轉換面額(轉出多少c幣)
  exchange_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 轉點日期
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

-- INSERT INTO c_coin_exchange (user_id, game_id, ,game_name ,c_coin_out)
-- VALUES (1, 3, ,'爆爆王' ,500);