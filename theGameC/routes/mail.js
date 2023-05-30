const express = require("express");
const page = express.Router();
const path = require("path");

var config = require("./CRUD/config");

//抓到session值，丟到mail.ejs
page.get("/", (req, res) => {
  // 確定登入以後session有存入到首頁
  if (req.session.userId) {
    const userId = req.session.userId;
    const userName = req.session.userName;
    const email = req.session.email;
    res.render("mail", { userId, userName, email });
  } else {
    res.redirect("/login?alert=needLogin");
  }
});

const multer = require("multer"); // 上傳不同檔案類型

//設定我拿到回函的圖片並給他路徑存取
const mailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/upload/mail_reply/");
  },
  //將圖檔名稱做一些更改，避免有人檔案重複
  filename: function (req, file, cb) {
    var getReplyImg = "reply_" + Date.now() + file.originalname.split("."[1])
    cb(null, getReplyImg);
  },
});
const mail_reply = multer({ storage: mailStorage });

//第一個post收取該圖檔
page.post("/upload", mail_reply.single('fileinput'), function (req, res) {
  // 文件上传成功，执行相关操作
  if (!req.file) {
    res.send("not")
  } else {
    //正確的話，就將該圖檔的名稱回傳丟到前端並用data1接收起來
    var getReplyImg = req.file.filename;
    res.send(getReplyImg);
  }
});

//第二個post接收該表單內的其他內容並輸入進sql
//接收到回函內容輸入sql
page.post("/get_reply", function (req, res) {
  var sql =
    "INSERT INTO service_reply (user_id,category, Subject, illustrate, reply_pic) VALUES (?,?,?,?,?);";
  //這個sql是sql語言寫的，?是代表我上面:要輸入的值將被填入到?中
  const user_id = req.body.user_id;
  const category = req.body.category;
  const Subject = req.body.Subject;
  const illustrate = req.body.illustrate;
  const reply_pic = "public/img/upload/mail_reply/" + req.body.reply_pic;

  // console.log(reply_pic);

  config.query(
    sql,
    [user_id, category, Subject, illustrate, reply_pic],
    function (err, results, fields) {
      if (err) {
        res.send("error: " + err.sqlMessage);
      } else {
        res.send("success");
      }
    }
  );
});



module.exports = page;



