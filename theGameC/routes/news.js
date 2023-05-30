const express = require("express");
const page = express.Router();
const axios = require("axios");

const news_CRUD_select = require("./news_CRUD/n_select");

/* 最新消息 */
page.get("/latest", async (req, res) => {
  const pageLimit = 5; // 一個分頁有幾筆新聞
  const currentPage = req.query.page || 1; // 當前頁，預設為 1
  let newsSelect = await axios.get(`http://localhost:80/news/api/getlatest`);
  const totalNews = newsSelect.data.length; // 新聞總數 (陣列的長度)
  const totalPages = Math.ceil(totalNews / pageLimit); // 總頁數 (總新聞數 / 一頁新聞數) 取天花板

  // console.log("一頁有多少新聞：", pageLimit);
  // console.log("當前頁為：", currentPage);
  // console.log("新聞總數量：", totalNews);
  // console.log("總頁數：", totalPages);

  let newsArr = [];
  for (let i = 0; i < totalNews; i += pageLimit) {
    newsArr.push(newsSelect.data.slice(i, i + pageLimit));
  }

  console.log(newsArr);
  res.render("news", {
    title: "latest",
    title_TC: "最新消息",
    title_Img: "latest/cover.jpg",
    title_text:
      "提供最新的多樣化消息，讓用戶能提前了解將來到的全新活動、遊戲及體驗，提前布局各種新功能和新玩法。",
    newsData: newsSelect.data,
    currentPage: currentPage,
    totalPages: totalPages,
    newsArr: newsArr,
  });
});

/* 遊戲更新 */
page.get("/games_updates", async (req, res) => {
  // 123
  const pageLimit = 5; // 一個分頁有幾筆新聞
  const currentPage = req.query.page || 1; // 當前頁，預設為 1
  let newsSelect = await axios.get(
    `http://localhost:80/news/api/getGameUpdates`
  );
  const totalNews = newsSelect.data.length; // 新聞總數 (陣列的長度)
  const totalPages = Math.ceil(totalNews / pageLimit); // 總頁數 (總新聞數 / 一頁新聞數) 取天花板

  let newsArr = [];
  for (let i = 0; i < totalNews; i += pageLimit) {
    newsArr.push(newsSelect.data.slice(i, i + pageLimit));
  }

  res.render("news", {
    title: "games_updates",
    title_TC: "遊戲更新",
    title_Img: "games_updates/cover.jpg",
    title_text:
      "定時更新遊戲版本，不斷優化遊戲品質，讓用戶在遊戲中獲得更好的體驗，同時也讓遊戲更具挑戰性和趣味性。",
    newsData: newsSelect.data,
    currentPage: currentPage,
    totalPages: totalPages,
    newsArr: newsArr,
  });
});

/* 優惠活動 */
page.get("/products_promotions", async (req, res) => {
  const pageLimit = 5; // 一個分頁有幾筆新聞
  const currentPage = req.query.page || 1; // 當前頁，預設為 1
  let newsSelect = await axios.get(
    `http://localhost:80/news/api/getProductsPromotions`
  );
  const totalNews = newsSelect.data.length; // 新聞總數 (陣列的長度)
  const totalPages = Math.ceil(totalNews / pageLimit); // 總頁數 (總新聞數 / 一頁新聞數) 取天花板

  let newsArr = [];
  for (let i = 0; i < totalNews; i += pageLimit) {
    newsArr.push(newsSelect.data.slice(i, i + pageLimit));
  }

  res.render("news", {
    title: "products_promotions",
    title_TC: "優惠活動",
    title_Img: "products_promotions/cover.jpg",
    title_text:
      "舉辦各種優惠活動，讓用戶獲得更多收益，增加遊戲與商品的互動性和樂趣，讓用戶能夠真正享受到遊戲的樂趣。",
    newsData: newsSelect.data,
    currentPage: currentPage,
    totalPages: totalPages,
    newsArr: newsArr,
  });
});

/* 新品上架 */
page.get("/new_products", async (req, res) => {
  const pageLimit = 5; // 一個分頁有幾筆新聞
  const currentPage = req.query.page || 1; // 當前頁，預設為 1
  let newsSelect = await axios.get(
    `http://localhost:80/news/api/getNewProducts`
  );
  const totalNews = newsSelect.data.length; // 新聞總數 (陣列的長度)
  const totalPages = Math.ceil(totalNews / pageLimit); // 總頁數 (總新聞數 / 一頁新聞數) 取天花板

  let newsArr = [];
  for (let i = 0; i < totalNews; i += pageLimit) {
    newsArr.push(newsSelect.data.slice(i, i + pageLimit));
  }

  res.render("news", {
    title: "new_products",
    title_TC: "新品上架",
    title_Img: "new_products/cover.jpg",
    title_text:
      "提供最新的遊戲商品訊息，讓用戶能提前了解將來會有哪些新商品，讓用戶能夠率先找到最適合自己的商品。",
    newsData: newsSelect.data,
    currentPage: currentPage,
    totalPages: totalPages,
    newsArr: newsArr,
  });
});

page.use("/", news_CRUD_select);

module.exports = page;
