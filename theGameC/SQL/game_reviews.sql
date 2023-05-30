CREATE TABLE game_reviews ( 
  game_review_id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL, -- 評分
  comment TEXT, -- 評論
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (game_id, user_id), -- 一個遊戲，一個會員只能評論一次
  CHECK (rating <= 5) -- 評分最多為5分
);

INSERT INTO game_reviews (game_id, user_id, rating, comment)
VALUES
  -- CSO
  -- 好評
  (1, 1, 5, '這個遊戲太棒了！'),
  (1, 3, 5, '非常好玩的遊戲！'),
  (1, 4, 4, '遊戲內容豐富，玩了很多小時。'),
  (1, 5, 5, '遊戲音樂很棒！'),
  (1, 6, 4, '有些小bug，但開發者很快修復。'),
  (1, 7, 5, '遊戲內容豐富，值得一玩！'),
  (1, 8, 4, '遊戲世界很精彩，喜歡這個背景設定。'),
  (1, 9, 5, '遊戲難度剛好，很有成就感。'),
  (1, 10, 4, '遊戲角色設計很出色。'),
  -- 壞評
  (1, 11, 2, '遊戲崩潰問題太多，很失望。'),
  (1, 12, 3, '一般般，沒有太大亮點。'),
  (1, 13, 2, '完全不值得買，浪費時間。'),
  (1, 14, 3, '不喜歡這個遊戲的畫風。'),
  (1, 15, 2, '完全不好玩，浪費錢。'),
  (1, 16, 3, '遊戲劇情平淡，缺乏激情。'),
  (1, 17, 2, '遊戲操作不順暢，玩起來很困難。'),
  (1, 18, 3, '遊戲內容缺乏創意，沒有驚喜。'),
  (1, 19, 2, '遊戲難度太高，無法通關。'),
  (1, 20, 3, '遊戲更新緩慢，無法持續吸引我。'),
  -- 其他評論
  (1, 21, 4, '遊戲畫面美觀，但需要更多內容更新。'),
  (1, 22, 4, '遊戲玩法獨特，但有些bug需要修復。'),
  (1, 23, 4, '遊戲故事情節引人入勝，希望有續集。'),
  (1, 24, 4, '遊戲音效很出色，營造了很好的氛圍。'),
  (1, 25, 4, '遊戲性平衡度不錯，沒有特別偏頗。'),
  (1, 26, 4, '遊戲社群互動豐富，玩家之間可以互相交流。'),
  (1, 27, 4, '遊戲策略性很高，需要思考和計劃。'),
  (1, 28, 4, '遊戲可玩性很高，我一直想再次挑戰。'),
  (1, 29, 4, '遊戲配樂動聽，很好地配合了遊戲氛圍。'),
  (1, 30, 4, '遊戲視覺效果出眾，特效很精彩。'),
  -- 額外評論
  (1, 31, 5, '遊戲創意獨特，沉浸式的體驗。'),
  (1, 32, 5, '遊戲平衡度很好，不會太簡單也不會太難。'),
  (1, 33, 5, '遊戲支援多人連線，和朋友一起玩很有趣。'),
  (1, 34, 5, '遊戲教學詳細，容易上手。'),
  (1, 35, 5, '遊戲更新頻繁，開發者對遊戲持續改進。'),
-- LOL
  -- 好評
  (7, 1, 5, '這個遊戲太棒了！'),
  (7, 3, 5, '非常好玩的遊戲！'),
  (7, 4, 4, '遊戲內容豐富，玩了很多小時。'),
  (7, 5, 5, '遊戲音樂很棒！'),
  (7, 6, 4, '有些小bug，但開發者很快修復。'),
  (7, 7, 5, '遊戲內容豐富，值得一玩！'),
  (7, 8, 4, '遊戲世界很精彩，喜歡這個背景設定。'),
  (7, 9, 5, '遊戲難度剛好，很有成就感。'),
  (7, 10, 4, '遊戲角色設計很出色。'),
  -- 壞評
  (7, 11, 2, '遊戲崩潰問題太多，很失望。'),
  (7, 12, 3, '一般般，沒有太大亮點。'),
  (7, 13, 2, '完全不值得買，浪費時間。'),
  (7, 14, 3, '不喜歡這個遊戲的畫風。'),
  (7, 15, 2, '完全不好玩，浪費錢。'),
  (7, 16, 3, '遊戲劇情平淡，缺乏激情。'),
  (7, 17, 2, '遊戲操作不順暢，玩起來很困難。'),
  (7, 18, 3, '遊戲內容缺乏創意，沒有驚喜。'),
  (7, 19, 2, '遊戲難度太高，無法通關。'),
  (7, 20, 3, '遊戲更新緩慢，無法持續吸引我。'),
  -- 其他評論
  (7, 21, 4, '遊戲畫面美觀，但需要更多內容更新。'),
  (7, 22, 5, '遊戲玩法獨特，但有些bug需要修復。'),
  (7, 23, 4, '遊戲故事情節引人入勝，希望有續集。'),
  (7, 24, 4, '遊戲音效很出色，營造了很好的氛圍。'),
  (7, 25, 5, '遊戲性平衡度不錯，沒有特別偏頗。'),
  (7, 26, 4, '遊戲社群互動豐富，玩家之間可以互相交流。'),
  (7, 27, 5, '遊戲策略性很高，需要思考和計劃。'),
  (7, 28, 4, '遊戲可玩性很高，我一直想再次挑戰。'),
  (7, 29, 5, '遊戲配樂動聽，很好地配合了遊戲氛圍。'),
  (7, 30, 1, '遊戲太差了，一分都不值得！'),
  -- 額外評論
  (7, 31, 5, '遊戲創意獨特，沉浸式的體驗。');