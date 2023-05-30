CREATE TABLE games ( -- 線上遊戲資料表
 game_id INT AUTO_INCREMENT PRIMARY KEY,  -- 遊戲編號
 game_name VARCHAR(20) NOT NULL UNIQUE, -- 遊戲名稱
 game_type VARCHAR(20) NOT NULL, -- 遊戲類型
 description TEXT,  -- 遊戲介紹
 image VARCHAR(255),  -- 遊戲封面圖
 image_paths JSON, -- 遊戲其他圖
 age_rating VARCHAR(10) NOT NULL, -- 年齡分級
 developer VARCHAR(20),  -- 開發商
 publisher VARCHAR(20),  -- 代理商
 downloads INT UNSIGNED,  -- 下載次數(用來判斷是否是熱門)
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM `games` WHERE 1;

INSERT INTO games (
    game_name, 
    game_type, 
    description, 
    image, 
    image_paths, 
    age_rating, 
    developer, 
    publisher, 
    downloads
) VALUES 
    ('CSO絕對武力', '射擊遊戲', 'Counter-Strike 是一款經典的第一人稱射擊遊戲，玩家需要根據任務目標進行射擊、燒毀物品、拆除炸彈等各種戰鬥行動。遊戲以恐怖分子和反恐精英兩方對戰為主題，具有深度和高度的槍械操作性和社交性的遊戲。', 'CSO/cover.jfif', '["CSO/cover.jfif", "CSO/1.png", "CSO/2.jpg", "CSO/3.jpg", "CSO/4.jpg"]', '6', 'Valve', 'Nexon', 41332),
    ('楓之谷', '冒險遊戲', '《楓之谷》是線上角色扮演遊戲，遊戲中有多樣職業，像劍士、法師等。遊戲的世界充滿了各種怪物，玩家需要冒險、升級，才能擊敗強敵。此外豐富的社交系統，讓玩家可以交流、組隊和進行競技，增加了遊戲的互動性和樂趣。', 'MapleStory/cover.jpg', '["MapleStory/cover.jpg", "MapleStory/1.jpg", "MapleStory/3.jpeg", "MapleStory/4.jpg", "MapleStory/5.jpg"]', '0', 'Nexon', 'Nexon', 53124),
    ('爆爆王', '競技遊戲', '《爆爆王》是競技類型的線上遊戲，玩家透過水球炸彈來擊敗對手。遊戲中有豐富的關卡和道具，玩家可以使用不同的策略來取得勝利。此外有社交功能可以其他玩家組隊、對戰和交流，增加了遊戲的樂趣和互動性。', 'CrazyArcade/cover.jpg', '["CrazyArcade/cover.jpg", "CrazyArcade/1.jpg", "CrazyArcade/2.jfif", "CrazyArcade/3.jpg", "CrazyArcade/4.jfif"]', '0', 'Nexon', 'Nexon', 18302),
    ('SF特種部隊', '射擊遊戲', '《SF特種部隊》是一款第一人稱線上射擊遊戲。玩家扮演不特種部隊進行各種任務和戰鬥。遊戲中有豐富的武器選擇，玩家可根據需要搭配。此外，遊戲還設有多種遊戲模式和競技場，增加了遊戲的趣味性和挑戰性。', 'SF/cover.webp', '["SF/cover.webp", "SF/1.jfif", "SF/2.jfif", "SF/3.jfif", "SF/4.jfif"]', '6', 'Dragon Fly', 'Dragon Fly', 18687),
    ('AVA戰地之王', '射擊遊戲', '《AVA戰地之王》是一款多人線上射擊遊戲，玩家在多種場景中進行團隊作戰。遊戲提供豐富模式，讓玩家體驗不同的戰局。遊戲擁有精美的畫面和流暢的動作，讓玩家能夠沉浸在戰爭的世界中。', 'AVA/cover.jpg', '["AVA/cover.jpg", "AVA/1.jpg", "AVA/2.jpg", "AVA/3.jpg", "AVA/4.png"]', '12', 'Dragon Fly', 'Nexon', 22335),
    ('跑跑卡丁車', '競技遊戲', '《跑跑卡丁車》是一款多人在線競技遊戲，玩家扮演卡丁車駕駛員進行比賽。遊戲擁有豐富多樣的賽道、角色和裝備，並提供豐富的遊戲模式供玩家選擇。遊戲操作簡易，但技巧深奧，是一款經典賽車遊戲。', 'KartRider/cover.jfif', '["KartRider/cover.jfif", "KartRider/1.png", "KartRider/2.jpg", "KartRider/4.webp", "KartRider/5.jfif"]', '6', 'Nexon', 'Nexon', 26112),
    ('英雄聯盟', '競技遊戲', '《英雄聯盟》是一款多人在線競技遊戲，玩家使用英雄進行對戰。遊戲擁有豐富的英雄和技能，讓玩家能夠享受策略與操作的樂趣。遊戲也有龐大的社群和賽事，成為全球電競風潮的代表，是不可錯過的經典遊戲。', 'LOL/cover.jpg', '["LOL/cover.jpg", "LOL/1.jpg", "LOL/2.jpg", "LOL/3.jpg", "LOL/4.jpg"]', '6', 'RIOT', 'RIOT', 92341),
    ('特戰英豪', '射擊遊戲', '《特戰英豪》是一款多人在線射擊遊戲，玩家扮演各國菁英進行各種任務和戰鬥。遊戲擁有多種武器和裝備，讓玩家能夠在享受快節奏的戰鬥。遊戲畫面精美，動作流暢，為玩家呈現出極富戰爭氛圍的遊戲世界。', 'Valorant/cover.jpg', '["Valorant/cover.jpg", "Valorant/1.png", "Valorant/2.webp", "Valorant/3.jpg", "Valorant/4.webp"]', '12', 'RIOT', 'RIOT', 43217),
    ('龍之谷', '冒險遊戲', '《龍之谷》是一款多人在線角色扮演遊戲，玩家可以扮演不同的職業，在奇幻的世界中展開冒險旅程。遊戲擁有豐富的地圖、任務和故事情節，讓玩家能夠體驗到不同的樂趣，為經典的 MMORPG 代表之一。', 'DragonNest/cover.jpg', '["DragonNest/cover.jpg", "DragonNest/1.jpg", "DragonNest/2.jpg", "DragonNest/3.jpg", "DragonNest/4.jpg"]', '6', 'Eyedentity', 'Nexon', 23366),
    ('全民打棒球', '競技遊戲', '《全民打棒球》是一款線上棒球遊戲，玩家組織自己的棒球隊，在比賽中挑戰其他玩家。遊戲提供豐富的球員，讓玩家能夠自由搭配球隊。遊戲操作簡單易上手，同時也有深入的策略性，是一款深受喜愛的棒球遊戲。', 'MaguMagu/cover.jpg', '["MaguMagu/cover.jpg", "MaguMagu/1.webp", "MaguMagu/2.jpg", "MaguMagu/3.jfif", "MaguMagu/4.png"]', '0', 'AniPark', 'AniPark', 20000),
    ('靈魂行者', '冒險遊戲', '《靈魂行者》是一款多人角色扮演遊戲，玩家扮演不同的角色，進行冒險、任務和戰鬥。遊戲擁有精美的畫面和豐富的遊戲內容，提供多樣的模式和社交功能，還有豐富的劇情和故事，讓玩家沉浸在的遊戲世界中。',  'SoulWorker/cover.webp', '["SoulWorker/cover.webp", "SoulWorker/1.jpg", "SoulWorker/2.png", "SoulWorker/3.png", "SoulWorker/4.png"]', '6', 'Lion Games', 'Lion Games', 18228),
    ('瑪奇英雄傳', '冒險遊戲', '《瑪奇英雄傳》是一款多人在線角色扮演遊戲，玩家扮演不同角色，在奇幻的世界中展開冒險旅程。遊戲擁有豐富的任務和故事情節，並提供畫面精美和社交功能，讓玩家能夠與其他玩家交流合作，為 MMORPG 的代表。', 'Vindictus/cover.jfif', '["Vindictus/cover.jfif", "Vindictus/1.jpg", "Vindictus/2.jpg", "Vindictus/3.jpg", "Vindictus/4.jpg"]', '18', 'devCAT', 'Nexon', 263341),
    ('Sven Coop', '射擊遊戲', '《Sven Coop》是一款多人在線合作遊戲，玩家將與其他玩家合作完成許多任務。遊戲是基於《Half Life》的 MOD 改版，提供豐富的模式、地圖和武器等。另外玩家能自由導入 MOD 和插件支持，使樂趣翻倍。', 'SvenCoop/cover.jpg', '["SvenCoop/cover.jpg", "SvenCoop/1.jpg", "SvenCoop/2.jpg", "SvenCoop/3.jpg", "SvenCoop/4.jpg"]', '6', 'SvenCo-op', 'SvenCo-op', 15871),
    ('艾爾之光', '冒險遊戲', '《艾爾之光》是一款多人在線角色扮演遊戲，玩家扮演不同的角色，在奇幻的世界中展開冒險旅程。遊戲擁有豐富的地圖、任務和故事情節，並提供多樣的遊戲模式和社交功能，讓玩家能夠與其他玩家交流合作。', 'Elsword/cover.jpg', '["Elsword/cover.jpg", "Elsword/1.jpg", "Elsword/2.jpg", "Elsword/3.jpg", "Elsword/4.jpg"]', '0', 'KOG', 'Nexon', 17226),
    ('戰車世界', '競技遊戲', '《戰車世界》是一款以坦克為主體的多人線上遊戲，玩家扮演各種戰車，與其他玩家戰鬥，以求升級和購買新戰車，體驗獨特的策略和戰鬥玩法。還有豐富的遊戲模式和社群活動，可以在遊戲中建立友誼。', 'WOT/cover.jpg', '["WOT/cover.jpg", "WOT/1.png", "WOT/2.jpg", "WOT/3.jpg", "WOT/4.jpg"]', '6', 'Game Stream', 'Wargaming', 19331),
    ('突擊風暴', '射擊遊戲', '《突擊風暴》是一款韓國開發的多人線上射擊遊戲，以其快節奏的戰鬥和豐富的遊戲模式而聞名。玩家可以免費下載並選擇不同角色和武器參與團隊死鬥、爆破模式等激烈對戰。遊戲操作流暢，戰鬥場景逼真，讓玩家感受到真實的射擊體驗。擁有豐富的遊戲地圖和戰鬥策略，讓玩家在戰場上展現技巧和智慧。', 'SuddenAttack/cover.jpg', '["SuddenAttack/cover.jpg", "SuddenAttack/1.png", "SuddenAttack/2.jpg", "SuddenAttack/3.jpg", "SuddenAttack/4.jpg"]', '12', 'GameHi', 'GameHi', 22500),
    ('Apex 英雄', '射擊遊戲', '《Apex 英雄》是一款由Respawn Entertainment開發的多人線上戰鬥遊戲。《Apex 英雄》提供了一個多樣化的英雄角色陣容，每位角色都擁有獨特的技能和遊戲風格。遊戲中的快節奏戰鬥、精美的地圖設計和流暢的遊戲操控都為玩家提供了令人驚喜和刺激的遊戲體驗。', 'apex/cover.jpg', '["apex/cover.jpg", "apex/1.webp", "apex/2.jpg", "apex/3.webp", "apex/4.jpg"]', '12', 'Respawn', '美商藝電', 39021),
    ('CS：全球攻勢', '射擊遊戲', '《CS：全球攻勢》是一款由Valve開發的多人射擊遊戲。遊戲分為反恐精英和恐怖分子兩個陣營，在各種地圖中進行對戰。玩家可以選擇不同的角色和武器，使用戰術和策略進行戰鬥。遊戲還提供了競技模式、競技場和社區創作等豐富的遊戲內容，吸引了全球眾多玩家的熱愛與追捧。', 'CSGO/cover.jpg', '["CSGO/cover.jpg", "CSGO/1.jpg", "CSGO/2.jpg", "CSGO/3.jpg", "CSGO/4.jpg"]', '12', 'Value', 'Value', 46013),
    ('鋼彈EVOLUTION', '射擊遊戲', '《鋼彈EVOLUTION》由BANDAI開發的多人線上射擊遊戲，基於知名的機動戰士鋼彈系列。玩家操縱鋼彈機體參與戰鬥，享受高速機動和破壞力十足的射擊對戰。遊戲中擁有豐富的機體選擇，每個機體都擁有獨特的特點和武器系統。玩家可以透過戰鬥經驗和資源來提升機體性能，打造自己的最強鋼彈。', 'GundamE/cover.jpg', '["GundamE/cover.jpg", "GundamE/1.jpg", "GundamE/2.jpg", "GundamE/3.jpg", "GundamE/4.jpg"]', '12', 'BANDAI', 'BANDAI', 20102),
    ('永恆冒險', '冒險遊戲', '《永恆冒險》一款由KOG開發的橫向卷軸動作角色扮演遊戲。玩家可以組建自己的團隊，選擇不同的英雄角色，並通過闖關、任務和對戰挑戰各種敵人。遊戲中擁有豐富的劇情故事和精美的遊戲畫面，並提供如PvP競技、合作任務和公會等活動。玩家可以通過培養英雄、裝備強化和技能升級來提升實力。', 'GrandChase/cover.jpg', '["GrandChase/cover.jpg", "GrandChase/1.jfif", "GrandChase/2.jpg", "GrandChase/3.jfif", "GrandChase/4.jpg"]', '6', 'KOG', 'KOG', 19511),
    ('封印者', '冒險遊戲', '《封印者》是一款由Naddic Games開發的多人線上動作角色扮演遊戲。玩家扮演封印者，利用超能力對抗入侵的怪物。遊戲中擁有多個可選擇的角色，每個角色都擁有獨特的技能和遊戲風格。以其流暢的戰鬥系統、精緻的動畫和吸引人的故事情節，為玩家呈現了一個充滿動作與冒險的異世界之旅。', 'closers/cover.jpg', '["closers/cover.jpg", "closers/1.jfif", "closers/2.jpg", "closers/3.jpg", "closers/4.jpg"]', '6', 'NADDIC GAMES', 'NADDIC GAMES', 20320),
    ('暴雪英霸', '競技遊戲', '《暴雪英霸》由暴雪娛樂開發的多人線上戰鬥競技遊戲。遊戲集結了暴雪多個遊戲系列的英雄角色，玩家組建五人小隊，與對手展開激烈的對戰，爭奪地圖上的目標和資源。每個英雄都有獨特的技能和戰術，玩家需要巧妙運用策略和團隊合作，以獲得勝利。', 'HOTS/cover.jfif', '["HOTS/cover.jfif", "HOTS/1.png", "HOTS/2.jpg", "HOTS/3.jpg", "HOTS/4.jpg"]', '6', '暴雪娛樂', '暴雪娛樂', 27012),
    ('爐石戰記', '競技遊戲', '《爐石戰記》由暴雪娛樂開發的線上集換式卡牌遊戲。玩家扮演一位魔法師，在一個虛構的魔法世界中與其他玩家對戰。遊戲中玩家組建自己的卡牌牌組，使用各種法術、隨從和武器進行策略性的對戰。玩家可以參與單人冒險、多人對戰、競技場等模式，並通過勝利獲得新的卡牌和奖勵。', 'Hearthstone/cover.jpg', '["Hearthstone/cover.jpg", "Hearthstone/1.jpg", "Hearthstone/2.jpg", "Hearthstone/3.jpg", "Hearthstone/4.jfif"]', '6', '暴雪娛樂', '暴雪娛樂', 40031)
