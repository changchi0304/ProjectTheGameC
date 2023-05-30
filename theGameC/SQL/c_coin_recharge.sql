CREATE TABLE c_coin_recharge ( -- C幣儲值表
  recharge_id INT PRIMARY KEY AUTO_INCREMENT, -- C幣儲值單號id
  user_id INT NOT NULL, -- 會員 id
  consume INT NOT NULL, -- 消費金額
  c_coin_get INT NOT NULL, -- C幣儲值金額 (獲得多少c幣)
  -- c_coin_balance INT UNSIGNED DEFAULT 0, -- c幣餘額
  pay_method VARCHAR(10) NOT NULL, -- 儲值方式：(credit、paypal、gash)
  credit_account VARCHAR(20) DEFAULT NULL, -- 信用卡卡號
  paypal_account VARCHAR(20) DEFAULT NULL, -- paypal帳號
  gash_number VARCHAR(20) DEFAULT NULL, -- gash卡號
  recharge_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 儲值日期
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

SELECT * FROM `c_coin_recharge` WHERE 1;

-- INSERT INTO c_coin_recharge (user_id, consume, c_coin_get, pay_method, credit_account)
-- VALUES (2, 500, 750, 'credit', '1234567812345678');