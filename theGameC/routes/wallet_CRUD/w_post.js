const express = require("express");
const page = express.Router();

const config = require("../CRUD/config"); // 引用 config

const multer = require("multer"); // 上傳不同檔案類型

// 大頭貼上傳事先設定
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/upload/Avatar/");
  },
  filename: function (req, file, cb) {
    cb(null, "avatar_" + Date.now() + file.originalname.split("."[1]));
  },
});
const avatar = multer({ storage: avatarStorage });

///////////////////
/* recharge 儲值 */
///////////////////
page.post("/insertRecharge/:user_id", (req, res) => {
  var sql =
    "INSERT INTO c_coin_recharge (user_id, consume, c_coin_get, pay_method, credit_account, paypal_account, gash_number) VALUES (?, ?, ?, ?, ?, ?, ?);";
  config.query(
    sql,
    [
      req.params.user_id,
      req.body.consume,
      req.body.c_coin_get,
      req.body.pay_method,
      req.body.credit_account,
      req.body.paypal_account,
      req.body.gash_number,
    ],
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Insert recharge data 出錯：", err);
      } else {
        console.log("Insert recharge data 成功:", results);
        res.send(results);
      }
    }
  );

  // console.log("req.body: ", req.body);
  // console.log("req.params.user_id: ", req.params);
});

///////////////////
/* exchange 轉點 */
///////////////////
page.post("/insertExchange/:user_id", (req, res) => {
  var sql =
    "INSERT INTO c_coin_exchange (user_id, game_id, game_name, c_coin_out) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [
      req.params.user_id,
      req.body.game_id,
      req.body.game_name,
      req.body.c_coin_out,
    ],
    function (err, results, fields) {
      if (err) {
        console.log("Error:", err);
        res.send("Insert exchange data 出錯：", err);
      } else {
        console.log("Insert exchange data 成功:", results);
        res.send(results);
      }
    }
  );

  // console.log("req.body: ", req.body);
  // console.log("req.params.user_id: ", req.params);
});

/**************************** */
/* 大頭貼上傳 (與資料庫無關) */
page.post("/upload_file", avatar.single("avatar"), (req, res) => {
  var file = req.file;

  if (!req.file) {
    var filePath = "/img/login/avatar/avatar_default.jpg";
  } else {
    var filePath = "/img/upload/Avatar/" + file.filename;
  }

  // console.log("檔案類型：%s", file.mimetype);
  // console.log("原始檔名：%s", file.originalname);
  // console.log("檔案大小：%s", file.size);
  // console.log("檔案存放路徑：%s", file.path);
  // console.log("檔案s", file.filename);

  // 將此傳給前端使用
  res.send(filePath);
});
module.exports = page;
