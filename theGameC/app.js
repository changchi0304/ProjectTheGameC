// 如果有要更改或新增東西，照下面分類放

/*--- module ---*/
const express = require("express");
const app = express();
const cors = require("cors"); // 允許不同網域請求
const bodyParser = require("body-parser"); // 允許不同網域請求
const cookieParser = require("cookie-parser");

/* 設定 port 90 可連近來 */
const setting = {
  origin: ["http://localhost:90"],
  // 設定此人可以進來，url 尾端不要有斜線
};
app.use(cors(setting));

// session設定
var session = require("express-session");
app.use(
  session({
    secret: "appelpsdogd",
    resave: true,
    saveUninitialized: true,

    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 5000 * 10000,
    },
  })
);

/* 常用中介軟體設置 */
app.use(cookieParser());

app.use((req, res, next) => {
  // 所有路由都套用 req.session.userId
  if (req.session.userId) {
    // 如果使用者已經登入，將 LoginUserID 設定為使用者 ID
    res.locals.LoginUserID = req.session.userId;
  } else {
    // 如果使用者沒有登入，LoginUserID 設定為 null
    res.locals.LoginUserID = null;
  }

  // 上一頁，設定 referer 變數
  res.locals.referer = req.get("referer");

  // 呼叫 next()，將控制權傳遞到下一個中介軟體或路由處理函式
  next();
});

/*--- 導入網頁路由 ---*/
const indexPage = require("./routes/index"); // 首頁
const loginPage = require("./routes/login"); // 登入頁
const gamePage = require("./routes/games"); // 遊戲大頁
const walletPage = require("./routes/wallet"); // 錢包頁
const newsPage = require("./routes/news"); // 新聞頁
const productPage = require("./routes/products"); // 商店頁(包括購物車頁)
const mailPage = require("./routes/mail"); // 客服信箱頁
const qaPage = require("./routes/qa"); // 客服信箱頁
const rulePage = require("./routes/rule"); // 客服信箱頁
const onlogin = require("./routes/onlogin"); // 已登入的會員頁面
const aboutme = require("./routes/about"); //關於
const store = require("./routes/store"); //商店

/*--- 導入 CRUD for 全體 路由 ---*/
// 這與專屬某網頁的CRUD不同，這裡主要放給全體路由都能做使用的CRUD
// 例如：SELECT users，這種的 table 是很多路由都有可能用到的
// 就直接在這設給大家用，以免不同網頁就要製作一個
const selectForAll = require("./routes/CRUD/select");
const insertForAll = require("./routes/CRUD/insert");

/*--- 中介 ---*/
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*--- 設定路由 ---*/
app.use("/", indexPage);
app.use("/wallet/", walletPage);
app.use("/news/", newsPage);
app.use("/products/", productPage);
app.use("/login", loginPage);
app.use("/games", gamePage);
app.use("/mail", mailPage);
app.use("/qa", qaPage);
app.use("/rule/", rulePage);
app.use("/onlogin", onlogin);
app.use("/About", aboutme);
app.use("/store", store);

/*--- CRUD for All 路由 ---*/
// ex. 想看 user6 的資料就是
// http://localhost/user/user6
// 原因看向 routes/CRUD/select.js
app.use("/", selectForAll);
app.use("/", insertForAll);

/*--- 網頁 404 ---*/
app.get("*", (req, res) => {
  res.render("404");
});

/*--- 伺服器 ---*/
app.listen(80, () => {
  console.log("【伺服器 port 80 啟動 - 代理商 TheGameC】");
  console.log("【Ctrl + C 可關閉伺服器】");
});
