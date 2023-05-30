-- 客服資料表
CREATE TABLE service_reply ( 
  reply_id INT PRIMARY KEY AUTO_INCREMENT, -- 回函編號
  user_id INT NOT NULL,  -- 使用回函的會員
  category VARCHAR(10) NOT NULL, -- 回報類別
  Subject VARCHAR(15)  NOT NULL, -- 填入主旨
  illustrate VARCHAR(100)  NOT NULL, -- 說明欄位
  reply_pic VARCHAR(100)  , -- 圖片的來源
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);