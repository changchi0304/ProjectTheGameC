CREATE TABLE LOL ( -- 使用者在 LOL 擁有的造型
 lol_skin INT AUTO_INCREMENT PRIMARY KEY, -- 造型表單 id
 user_id INT NOT NULL, -- 使用者 id
 skin_id INT NOT NULL, -- 造型編號
 skin_name VARCHAR(15) NOT NULL UNIQUE, -- 造型名稱
 pay INT NOT NULL, -- 花多少點數買到的
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 UNIQUE (user_id, skin_id) -- 某人擁有某造型只會出現一次(不會同一人再度擁有同造型)
);

SELECT * FROM `lol` WHERE user_id = 1