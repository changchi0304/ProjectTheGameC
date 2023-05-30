const express = require("express");
const page = express.Router();

var config = require('../CRUD/config');



/* 會員資料 */
page.get("/last_id", (req, res) => {
  var sql =
    "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1;";
  config.query(
    sql,
    // 名稱照 /: 打
    function (err, results, fields) {
      // console.log(results[0]);
      res.send(JSON.stringify(results[0]));
    }
  );
});
// if (err) throw err;
//       // res.send(JSON.stringify(results));
//       // console.log(results[0].username);
// res.send(results.length > 0);
page.post("/getUsername", (req, res) => {
  const userName = req.body.username
  const password = req.body.password
  var sql = `SELECT * FROM users WHERE username='${userName}' AND password='${password}';`
  config.query(sql, function (err, results, fields) {
    if (results.length > 0) {
      // 登入成功，設定 session
      // console.log(results[0]);
      req.session.userId = results[0].user_id;
      req.session.userName = results[0].username;
      req.session.email = results[0].email;
      
      // console.log( req.session.email);
      res.send('success');
      // res.redirect('/');
    } else {
      res.send('fail');
    }
  });
});

module.exports = page;
