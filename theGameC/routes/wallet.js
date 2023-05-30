const express = require("express");
const page = express.Router();
const axios = require("axios");

const wallet_select = require("./CRUD/select");
const Game_coin_update = require("./CRUD/update");
const wallet_CRUD_update = require("./wallet_CRUD/w_update");
const wallet_CRUD_post = require("./wallet_CRUD/w_post");
const wallet_CRUD_select = require("./wallet_CRUD/w_select");
const wallet_GD_CRUD = require("./wallet_CRUD/GD_CRUD");

// ----------------
/* PI 頁面 */
page.get(`/PI/:id`, async (req, res) => {
  /* 用戶資料 */
  let usersSelect = await axios.get(
    `http://localhost:80/user/${req.params.id}`
  );
  /* 儲值紀錄 */
  let coinRecharge_data = await axios.get(
    `http://localhost:80/wallet/recharge_data/${req.params.id}`
  );

  /* 使用者擁有的遊戲 */
  let userGames = await axios.get(
    `http://localhost:80/user_games/${req.params.id}`
  );
  // 如果使用者沒有任何遊戲資料，就給空陣列，以免 undefined.split() 錯誤
  if (
    userGames &&
    userGames.data &&
    userGames.data.games &&
    userGames.data.images &&
    userGames.data.gameCoin
  ) {
    var GameData = { ...userGames.data };
    GameData.games = userGames.data.games.split(",");
    GameData.images = userGames.data.images.split(",");
    GameData.gameID = userGames.data.gameID.split(",");
    GameData.gameCoin = userGames.data.gameCoin.split(",");
    // console.log("這是 gamedata：" + GameData);
  } else {
    var GameData = { games: 0, images: 0 };
    // console.log(GameData);
  }

  // 沒登入就點 wallet，跳轉到登入頁面且 alert
  if (req.session.userId) {
    if (req.session.userId == req.params.id) {
      res.render("wallet_PI", {
        title: "My Wallet",
        currentRoute: "Route_PI",
        userData: usersSelect.data,
        userRechargeData: coinRecharge_data.data,
        userGame: GameData,
        // LoginUserID: req.session.userId,
      });
    } else {
      res.render("Denied");
    }
  } else {
    res.redirect("/login?alert=needLogin");
  }
});

// ----------------
/* 儲值頁面 */
page.get("/recharge/:id", async (req, res) => {
  let usersSelect = await axios.get(
    `http://localhost:80/user/${req.params.id}`
  );

  if (req.session.userId) {
    if (req.session.userId == req.params.id) {
      res.render("wallet_recharge", {
        title: "My Wallet",
        currentRoute: "Route_recharge",
        userData: usersSelect.data,
        // LoginUserID: req.session.userId,
      });
    } else {
      res.render("Denied");
    }
  } else {
    res.redirect("/login?alert=needLogin");
  }
});

// ----------------
/* 轉點頁面 */
page.get("/exchange/:id", async (req, res) => {
  let usersSelect = await axios.get(
    `http://localhost:80/user/${req.params.id}`
  );

  // const user_id = usersSelect.data.user_id;

  // 使用者擁有的遊戲
  let userGames = await axios.get(
    `http://localhost:80/user_games/${req.params.id}`
  );

  // 如果使用者沒有任何遊戲資料，就給空陣列，以免 undefined.split() 錯誤
  if (
    userGames &&
    userGames.data &&
    userGames.data.games &&
    userGames.data.images &&
    userGames.data.gameCoin
  ) {
    var GameData = { ...userGames.data };
    GameData.games = userGames.data.games.split(",");
    GameData.images = userGames.data.images.split(",");
    GameData.gameID = userGames.data.gameID.split(",");
    GameData.gameCoin = userGames.data.gameCoin.split(",");
    // console.log("這是 gamedata：" + GameData);
  } else {
    var GameData = { games: 0, images: 0 };
    // console.log(GameData);
  }

  if (req.session.userId) {
    if (req.session.userId == req.params.id) {
      res.render("wallet_exchange", {
        title: "My Wallet",
        currentRoute: "Route_exchange",
        userData: usersSelect.data,
        userGame: GameData,
        // LoginUserID: req.session.userId,
      });
    } else {
      res.render("Denied");
    }
  } else {
    res.redirect("/login?alert=needLogin");
  }
});

// 綁定為 http://localhost/wallet/...
// 主要用於 wallet_CRUD
page.use("/", wallet_CRUD_update);
page.use("/", wallet_CRUD_select);
page.use("/", wallet_CRUD_post);
page.use("/", wallet_GD_CRUD);

module.exports = page;
