const express = require("express");
const page = express.Router();
const axios = require("axios");

const index_select = require('./index_CRUD/index_select')


page.get("/", async (req, res) => {
  //線上遊戲
  let games = await axios.get(
    `http://localhost:80/getGames`
  );
  //新聞
  let News = await axios.get(
    `http://localhost:80/getNews`
  );
  //遊戲更新
  let GameUpdate = await axios.get(
    `http://localhost:80/getGameUpdate`
  );
  let promotion = await axios.get(
    `http://localhost:80/getpromotion`
  );
  let products = await axios.get(
    `http://localhost:80/getproducts`
  );
  let newproduct = await axios.get(
    `http://localhost:80/newproduct`
  );

  res.render("index", {
    gameimg: games.data,
    news: News.data,
    gameUpdate: GameUpdate.data,
    promotion: promotion.data,
    products:products.data,
    newproduct:newproduct.data,
  });

});

page.use("/", index_select)

module.exports = page;
