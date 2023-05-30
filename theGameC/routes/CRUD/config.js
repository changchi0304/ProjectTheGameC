const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost", // 預設為 localhost
  port: 8889, // 資料庫連線的 port 號
  user: "root", // 通往資料庫的帳號
  password: "root", // 通往資料庫的密碼
  database: "thegamec", // 連到哪裡
  multipleStatements: true, // 可協帶多個指令出去
});
connect.connect(function (err, connection) {
  if (err) {
    console.log("資料庫連線錯誤", err.sqlMessage);
  } else {
    console.log("資料庫連線成功");
    console.log(connection);
  }
});

module.exports = connect;
