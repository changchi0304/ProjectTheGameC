const express = require("express");
const app = express();
const cors = require("cors"); // 允許不同網域請求
const bodyParser = require("body-parser"); // 允許不同網域請求
const axios = require("axios");
const session = require("express-session");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // true 能解析更複雜的資料

///////////////////////////////
// 伺服器
///////////////////////////////
// app.use(
//   session({
//     secret: "LoL",
//     resave: true,
//     saveUninitialized: true,

//     cookie: {
//       path: "/", // 設為整個網頁上都可使用
//       httpOnly: true,
//       secure: false,
//       maxAge: 3000 * 1000,
//     },
//   })
// );

// app.get("/favicon.ico", (req, res) => res.status(204)); // 避免瀏覽器的 favicon.ico 請求觸發 /:id 路由

// app.use((req, res, next) => {
//   if (req.session.LOL_userId) {
//     // res.locals 為 express 的屬性，不可改名稱，
//     // LoginUserID 為你要儲存進 res.locals 物件內的
//     // 變數名稱，可自由取
//     res.locals.LoginUserID = req.session.LOL_userId;
//   } else {
//     res.locals.LoginUserID = null;
//   }
//   next();
// });

///////////////////////////////
// 路由
///////////////////////////////
/* 尚未登入 */
app.get("/", async (req, res) => {
  res.render("GameStore", {
    userLoginID: res.locals.LoginUserID,
  });
});

/* 登入 */
// 撈取 80 的 user_games - wallet_CRUD/GD_CRUD.js
app.get("/:id", async (req, res) => {
  // req.session.LOL_userId = req.params.id;

  let userGame = await axios.get(
    `http://localhost:80/wallet/api/game_coin/${req.params.id}`
  );
  console.log("獲取的資料-user_games：", userGame.data[0]);
  let mylolSkin = await axios.get(
    `http://localhost:80/wallet/api/lol_skins/${req.params.id}`
  );
  console.log("獲取的資料-lol：", mylolSkin.data);

  // console.log("123", req.session.LOL_userId);

  // 該使用者是否有該遊戲(撈到的資料是否是[]？)
  if (userGame.data[0] == null || userGame.data[0] == undefined) {
    res.redirect("/?err=noGame");
  } else {
    res.render("GameStore_users", {
      userGameData: userGame.data[0],
      userlolSkin: mylolSkin.data, // 陣列
      userLoginID: res.locals.LoginUserID,
    });
  }
});

// port
app.listen(90, () => {
  console.log("【伺服器 port 90 啟動 - 遊戲廠商：英雄聯盟】");
  console.log("【Ctrl + C 可關閉伺服器】");
});
