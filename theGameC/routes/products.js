const express = require("express");
const page = express.Router();
const axios = require("axios");

const product_CRUD_select = require("./product_CRUD/p_select");
const product_CRUD_insert = require("./product_CRUD/p_insert");
const product_CRUD_delete = require("./product_CRUD/p_delete");
const product_CRUD_update = require("./product_CRUD/p_update");

/* 購物車頁 */
page.get("/shopping_cart", async (req, res) => {
  let shoppingCartSelect = await axios.get(
    `http://localhost/products/api/shopping_carts/user/${res.locals.LoginUserID}`
  );

  let shoppingCartTotal = await axios.get(
    `http://localhost/products/api/shoppingCartsTotal/user/${res.locals.LoginUserID}`
  );

  let productData = await axios.get(
    `http://localhost/products/api/productAll/`
  );

  let productIDarr = [];
  productData.data.forEach((v) => {
    productIDarr.push(v.product_id);
  });
  // console.log(productIDarr);
  // console.log(productIDarr.product_id, "545665156");
  // console.log(shoppingCartSelect.data);
  // console.log("--", shoppingCartTotal.data[0]);

  if (req.session.userId) {
    res.render("shopping_cart", {
      SCdata: shoppingCartSelect.data,
      SCtotal: shoppingCartTotal.data[0],
      userID: res.locals.LoginUserID,
      productData: productData,
      productIDarr: productIDarr,
    });
  } else {
    res.redirect("/login?alert=needLogin");
  }
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/* 商品單頁 */
page.get("/product_ID/:product_id", async (req, res) => {
  /* 商品 */
  let productSelect = await axios.get(
    `http://localhost:80/products/api/productID/${req.params.product_id}`
  );
  // 類型 Icon、CSS背景、你可能喜歡 SELECT 路徑
  var typeIcon = "";
  var typeCss = "";
  var typeName = ""; // 你可能會喜歡 SELECT 路徑
  switch (productSelect.data.product_type) {
    case "動作":
      typeIcon = "/img/Products/ProductType/typeIAction.png";
      typeCss = "ProductPageBgAction";
      typeName = productSelect.data.product_type;
      break;
    case "冒險":
      typeIcon = "/img/Products/ProductType/typeIAVG.png";
      typeCss = "ProductPageBgAVG";
      typeName = productSelect.data.product_type;
      break;
    case "模擬":
      typeIcon = "/img/Products/ProductType/typeISLG.png";
      typeCss = "ProductPageBgSLG";
      typeName = productSelect.data.product_type;
      break;
    case "策略":
      typeIcon = "/img/Products/ProductType/typeIStra.png";
      typeCss = "ProductPageBgStrategy";
      typeName = productSelect.data.product_type;
      break;
    case "運動與競技":
      typeIcon = "/img/Products/ProductType/typeICom.png";
      typeCss = "ProductPageBgEsport";
      typeName = productSelect.data.product_type;
      break;
  }
  // 年齡限制
  var ageRating = "";
  switch (productSelect.data.age_rating) {
    case "6":
      ageRating = "保護級";
      break;
    case "12":
      ageRating = "輔導級";
      break;
    case "18":
      ageRating = "限制級";
      break;
    default:
      ageRating = "普遍級";
      break;
  }

  /* 商品評分 - 平均 */
  let productRatingSelect = await axios.get(
    `http://localhost/products/api/productID/${req.params.product_id}/rating`
  );
  let productRating = productRatingSelect.data.average_rating
    ? productRatingSelect.data.average_rating.toFixed(1)
    : "N";

  /* 商品共有多少 */
  let productAmount = await axios.get(
    "http://localhost/products/api/products_amount"
  );

  /* 用戶 - 商品評論 */
  let user_productReview = await axios.get(
    `http://localhost/products/api/productID/${req.params.product_id}/userID/${res.locals.LoginUserID}/rating`
  );

  /* 評論區 */
  let productComment = await axios.get(
    `http://localhost/products/api/product_reviews/productID/${req.params.product_id}`
  );

  /* 你可能會喜歡 */
  let user_mayLike = await axios.get(
    `http://localhost/products/api/product_type/${typeName}`
  );

  /* 是否加入購物車 */
  let inShoppingCart = await axios.get(
    `http://localhost/products/api/join_SC/${req.params.product_id}/${res.locals.LoginUserID}`
  );

  /* 是否已購買 */
  let userHaveProduct = await axios.get(
    ` http://localhost/products/api/user_products/${req.params.product_id}/${res.locals.LoginUserID}`
  );

  /* 年齡分級 */
  let age_limit = await axios.get(
    `http://localhost/products/api/product_ageLimit/${req.params.product_id}/${res.locals.LoginUserID}`
  );

  if (req.params.product_id <= productAmount.data.amount) {
    /* 判斷是否登入 */
    if (res.locals.LoginUserID) {
      // 已登入
      res.render("productPage", {
        typeIcon: typeIcon,
        typeCss: typeCss,
        ageRating: ageRating,
        productData: productSelect.data,
        productRating: productRating,
        login_user_id: res.locals.LoginUserID,
        u_p_review: user_productReview.data,
        userLike: user_mayLike.data,
        inshoppingCart: inShoppingCart.data,
        uProduct: userHaveProduct.data,
        pComment: productComment.data,
        ageLimit: age_limit.data,
      });
    } else {
      // 未登入
      res.render("productPage", {
        typeIcon: typeIcon,
        typeCss: typeCss,
        ageRating: ageRating,
        productData: productSelect.data,
        productRating: productRating,
        login_user_id: res.locals.LoginUserID,
        u_p_review: user_productReview.data,
        userLike: user_mayLike.data,
        inshoppingCart: inShoppingCart.data,
        pComment: productComment.data,
        ageLimit: age_limit.data,
      });
    }
  } else {
    res.render("404");
  }
});

page.use("/", product_CRUD_select);
page.use("/", product_CRUD_insert);
page.use("/", product_CRUD_delete);
page.use("/", product_CRUD_update);

module.exports = page;
