const express = require("express");
const page = express.Router();
const axios = require("axios");

const game_CRUD_select = require("./game_CRUD/g_select ");
const game_CRUD_insert = require("./game_CRUD/g_insert");
const game_CRUD_delete = require("./game_CRUD/g_delete");
const game_CRUD_update = require("./game_CRUD/g_update");

page.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:80/games/game_select"); // 向g_select.js裡面撈資料

    const response2 = await axios.get(
      "http://localhost:80/games/game_select_bg"
    );
    res.render(
      "games", // 渲染 games.ejs
      { apple: response.data, cat: response2.data }
    );
    console.log("有收到");
  } catch (error) {
    console.error(error);
    res.status(500).send("伺服器出問題");
    console.log("沒收到", error);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

/* old 遊戲單頁 */
// page.get("/game_ID/:game_id", async (req, res) => {
//   /* 遊戲 */
//   let gameSelect = await axios.get(
//     `http://localhost:80/games/api/gameID/${req.params.game_id}`
//   );
//   // 類型 Icon、CSS背景、你可能喜歡 SELECT 路徑
//   var typeIcon = "";
//   var typeCss = "";
//   var typeName = ""; // 你可能會喜歡 SELECT 路徑
//   switch (gameSelect.data.game_type) {
//     case "射擊遊戲":
//       typeIcon = "/img/Games/GameTypeBg/typeIShooting.png";
//       typeCss = "ProductPageBgShooting";
//       typeName = gameSelect.data.game_type;
//       break;
//     case "冒險遊戲":
//       typeIcon = "/img/Games/GameTypeBg/typeIAVG.png";
//       typeCss = "ProductPageBgAVG";
//       typeName = gameSelect.data.game_type;
//       break;
//     case "競技遊戲":
//       typeIcon = "/img/Games/GameTypeBg/typeICom.png";
//       typeCss = "ProductPageBgCom";
//       typeName = gameSelect.data.game_type;
//       break;
//   }
//   // 年齡限制
//   var ageRating = "";
//   switch (gameSelect.data.age_rating) {
//     case "6":
//       ageRating = "保護級";
//       break;
//     case "12":
//       ageRating = "輔導級";
//       break;
//     case "18":
//       ageRating = "限制級";
//       break;
//     default:
//       ageRating = "普遍級";
//       break;
//   }

//   // 把 JSON 多張圖片字串轉為陣列
//   if (!gameSelect.data.image_paths) {
//     gameSelect.data.image_paths = null;
//   } else {
//     gameSelect.data.image_paths = JSON.parse(gameSelect.data.image_paths);
//   }

//   /* 遊戲評分 - 平均 */
//   let gameRatingSelect = await axios.get(
//     `http://localhost/games/api/gameID/${req.params.game_id}/rating`
//   );
//   let gameRating = gameRatingSelect.data.average_rating
//     ? gameRatingSelect.data.average_rating.toFixed(1)
//     : "N";

//   /* 遊戲共有多少 */
//   let gameAmount = await axios.get("http://localhost/games/api/games_amount");

//   /* 用戶 - 遊戲評論 */
//   let user_gameReview = await axios.get(
//     `http://localhost/games/api/gameID/${req.params.game_id}/userID/${res.locals.LoginUserID}/rating`
//   );

//   /* 評論區 */
//   let gameComment = await axios.get(
//     `http://localhost/games/api/game_reviews/gameID/${req.params.game_id}`
//   );

//   /* 年齡分級 */
//   let age_limit = await axios.get(
//     `http://localhost/games/api/game_ageLimit/${req.params.game_id}/${res.locals.LoginUserID}`
//   );

//   // console.log(age_limit.data);

//   // var gameCommentOrder;

//   // switch (req.query.sort) {
//   //   case "byCreated":
//   //     gameCommentOrder = gameComment.data.byCreated;
//   //     break;
//   //   case "byRating":
//   //     gameCommentOrder = gameComment.data.byRating;
//   //     break;
//   //   default:
//   //     gameCommentOrder = gameComment.data.byCreated;
//   //     break;
//   // }

//   // console.log("我要的", gameCommentOrder);

//   /* 你可能會喜歡 */
//   let user_mayLike = await axios.get(
//     `http://localhost/games/api/game_type/${typeName}`
//   );

//   /* 是否擁有遊戲 */
//   let userHaveGame = await axios.get(
//     `http://localhost/games/api/user_games/${req.params.game_id}/${res.locals.LoginUserID}`
//   );

//   /* 選取所有遊戲 */
//   let allGames = await axios.get("http://localhost:80/games/game_select");
//   // console.log("4564654654645", allGames.data);

//   /* 選取遊戲類型 */
//   // let allGameTypes = await axios.get(
//   //   `http://http://localhost/games/api/newGamePage/Game_type/${game_type}`
//   // );

//   const game_type = req.query.game_type;

//   if (req.params.game_id <= gameAmount.data.amount) {
//     if (res.locals.LoginUserID) {
//       res.render("gamepage", {
//         typeIcon: typeIcon,
//         typeCss: typeCss,
//         ageRating: ageRating,
//         gameRating: gameRating,
//         u_g_review: user_gameReview.data,
//         login_user_id: res.locals.LoginUserID,
//         userLike: user_mayLike.data,
//         uGame: userHaveGame.data,
//         gameData: gameSelect.data,
//         gComment: gameComment.data,
//         ageLimit: age_limit.data,
//         allGames: allGames.data,
//         SelectGame_type: game_type,
//       });
//     } else {
//       res.render("gamepage", {
//         typeIcon: typeIcon, // 不同種類 icon
//         typeCss: typeCss, // 不同總類 CSS
//         ageRating: ageRating, // 年齡分級
//         gameRating: gameRating, // 遊戲平均分數
//         u_g_review: user_gameReview.data,
//         login_user_id: res.locals.LoginUserID, // 登入 id
//         userLike: user_mayLike.data, // 用戶也許會喜歡的遊戲
//         uGame: userHaveGame.data, // 用戶是否已加入遊戲
//         gameData: gameSelect.data, // 遊戲
//         gComment: gameComment.data, // 遊戲討論區
//         ageLimit: age_limit.data,
//         allGames: allGames.data,
//         SelectGame_type: game_type,
//       });
//     }
//   } else {
//     res.render("404");
//   }
// });

/* new 遊戲單頁 */
page.get("/game_ID/:game_id", async (req, res) => {
  /* 遊戲 */
  let gameSelect = await axios.get(
    `http://localhost:80/games/api/gameID/${req.params.game_id}`
  );
  // 類型 Icon、CSS背景、你可能喜歡 SELECT 路徑
  var typeIcon = "";
  var typeCss = "";
  var typeName = ""; // 你可能會喜歡 SELECT 路徑
  switch (gameSelect.data.game_type) {
    case "射擊遊戲":
      typeIcon = "/img/Games/GameTypeBg/typeIShooting.png";
      typeCss = "background_shooting";
      typeName = gameSelect.data.game_type;
      break;
    case "冒險遊戲":
      typeIcon = "/img/Games/GameTypeBg/typeIAVG.png";
      typeCss = "background_avg";
      typeName = gameSelect.data.game_type;
      break;
    case "競技遊戲":
      typeIcon = "/img/Games/GameTypeBg/typeICom.png";
      typeCss = "background_com";
      typeName = gameSelect.data.game_type;
      break;
  }
  // 年齡限制
  var ageRating = "";
  var ageImg = "";
  switch (gameSelect.data.age_rating) {
    case "6":
      ageRating = "保護級";
      ageImg = "tools/R6.jpg";
      break;
    case "12":
      ageRating = "輔導級";
      ageImg = "tools/R12.png";
      break;
    case "18":
      ageRating = "限制級";
      ageImg = "tools/R18.jpg";
      break;
    default:
      ageRating = "普遍級";
      ageImg = "tools/R0.jpg";
      break;
  }

  // 把 JSON 多張圖片字串轉為陣列
  if (!gameSelect.data.image_paths) {
    gameSelect.data.image_paths = null;
  } else {
    gameSelect.data.image_paths = JSON.parse(gameSelect.data.image_paths);
  }

  /* 遊戲評分 - 平均 */
  let gameRatingSelect = await axios.get(
    `http://localhost/games/api/gameID/${req.params.game_id}/rating`
  );
  let gameRating = gameRatingSelect.data.average_rating
    ? gameRatingSelect.data.average_rating.toFixed(1)
    : "N";

  /* 遊戲共有多少 */
  let gameAmount = await axios.get("http://localhost/games/api/games_amount");

  /* 用戶 - 遊戲評論 */
  let user_gameReview = await axios.get(
    `http://localhost/games/api/gameID/${req.params.game_id}/userID/${res.locals.LoginUserID}/rating`
  );

  /* 評論區 */
  let gameComment = await axios.get(
    `http://localhost/games/api/game_reviews/gameID/${req.params.game_id}`
  );

  /* 年齡分級 */
  let age_limit = await axios.get(
    `http://localhost/games/api/game_ageLimit/${req.params.game_id}/${res.locals.LoginUserID}`
  );

  let x = await axios.get(`http://localhost/games/api/newGamePage/Game_type`);

  console.log(x.data);

  // var gameCommentOrder;

  // switch (req.query.sort) {
  //   case "byCreated":
  //     gameCommentOrder = gameComment.data.byCreated;
  //     break;
  //   case "byRating":
  //     gameCommentOrder = gameComment.data.byRating;
  //     break;
  //   default:
  //     gameCommentOrder = gameComment.data.byCreated;
  //     break;
  // }

  // console.log("我要的", gameCommentOrder);

  /* 你可能會喜歡 */
  let user_mayLike = await axios.get(
    `http://localhost/games/api/game_type/${typeName}`
  );

  /* 是否擁有遊戲 */
  let userHaveGame = await axios.get(
    `http://localhost/games/api/user_games/${req.params.game_id}/${res.locals.LoginUserID}`
  );

  /* 選取所有遊戲 */
  let allGames = await axios.get("http://localhost:80/games/game_select");
  // console.log("4564654654645", allGames.data);

  /* 選取遊戲類型 */
  // let allGameTypes = await axios.get(
  //   `http://http://localhost/games/api/newGamePage/Game_type/${game_type}`
  // );

  /* 選取評分長條圖 */
  let gameChart = await axios.get(
    `http://localhost:80/games/api/comment_chart/${req.params.game_id}`
  );

  console.log("------", gameChart);

  var game_type;
  if (req.params.game_id <= gameAmount.data.amount) {
    if (res.locals.LoginUserID) {
      res.render("gamepage", {
        typeIcon: typeIcon,
        typeCss: typeCss,
        ageRating: ageRating,
        ageImg: ageImg,
        gameRating: gameRating,
        u_g_review: user_gameReview.data,
        login_user_id: res.locals.LoginUserID,
        userLike: user_mayLike.data,
        uGame: userHaveGame.data,
        gameData: gameSelect.data,
        gComment: gameComment.data,
        ageLimit: age_limit.data,
        allGames: allGames.data,
        SelectGame_type: req.query.game_type,
        gameChart: gameChart.data,
      });
    } else {
      res.render("gamepage", {
        typeIcon: typeIcon, // 不同種類 icon
        typeCss: typeCss, // 不同總類 CSS
        ageRating: ageRating, // 年齡分級
        ageImg: ageImg,
        gameRating: gameRating, // 遊戲平均分數
        u_g_review: user_gameReview.data,
        login_user_id: res.locals.LoginUserID, // 登入 id
        userLike: user_mayLike.data, // 用戶也許會喜歡的遊戲
        uGame: userHaveGame.data, // 用戶是否已加入遊戲
        gameData: gameSelect.data, // 遊戲
        gComment: gameComment.data, // 遊戲討論區
        ageLimit: age_limit.data,
        allGames: allGames.data,
        SelectGame_type: req.query.game_type,
        gameChart: gameChart.data,
      });
    }
  } else {
    res.render("404");
  }
});

page.use("/", game_CRUD_select);
page.use("/", game_CRUD_insert);
page.use("/", game_CRUD_delete);
page.use("/", game_CRUD_update);

module.exports = page;
