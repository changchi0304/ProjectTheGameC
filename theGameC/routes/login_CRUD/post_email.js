const express = require("express");
const page = express.Router();

var config = require('../CRUD/config');
const nodemailer = require('nodemailer');

//引用 nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'win87525@gmail.com',
        pass: 'ecadlswbavvoalda'
    }
});

var randomNumber = Math.floor(Math.random() * 9000) + 1000;
// 生成1000-9999之間的整數

// 發送驗證碼
page.post('/getVerification', (req, res) => {

    var sql = "SELECT email FROM users WHERE username = ?;"
    const username = req.body.username

    config.query(sql, [username],
        function (err, results, fields) {
            if (err) {
                console.log("錯誤")
            }

            if (results.length === 0) {
                console.log("沒有該帳號");
                res.send('沒有該帳號')
            } else {
                const email = results[0].email;
                console.log(email); // 在後端顯示email以進行測試
                res.send(`請至:${email}查看發送的驗證碼`)

                const mailOptions = {
                    from: 'win87525@gmail.com',
                    to: email,
                    subject: 'ThegameC密碼更動',
                    html: ` <div>
                    <div class="adM">
                    </div>
                    <h3><span style="color:rgb(0,0,0);font-size:15px">Hi，親愛的玩家</span></h3>
                    <span style="color:rgb(0,0,0);font-size:15px"> </span>
                    <p><span style="color:rgb(0,0,0);font-size:15px">您正在修改密碼，驗證碼為：</span><span style="color:rgb(0,0,0)"><strong><span
                            style="color:rgb(78,164,220);font-size:15px">${randomNumber}</span></strong><span style="font-size:15px">。</span>
                      </span>
                    </p>
                    <span style="color:rgb(0,0,0);font-size:15px"> </span>
                    <p><span style="color:rgb(0,0,0);font-size:15px">請在30分鐘內完成驗證。</span></p>
                    <span style="color:rgb(0,0,0);font-size:15px"> </span>
                    <div>
                      <span style="color:rgb(0,0,0);font-size:15px"> </span>
                      <p><span style="color:rgb(0,0,0);font-size:15px">TheGameC</span></p>
                      <span style="color:rgb(0,0,0)"> </span>
                      <h5><span style="color:rgb(119,119,119);font-size:13px">此為系統郵件，請勿回覆。</span></h5>
                      <div class="yj6qo"></div>
                      <div class="adL">
                      </div>
                    </div>
                    <div class="adL">
                    </div>
                  </div>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send('Error sending email');
                    } else {
                        console.log('Email sent: ' + info.response);
                        console.log(`${randomNumber}`);
                        // res.send(`${randomNumber}`);
                    }
                });
            }
        });


});
page.post('/updatePswd', (req, res) => {
    // 生成1000-9999之間的整數

    var updatesql = "UPDATE users SET password = ? WHERE username = ?;"
    const username = req.body.username
    const verification = req.body.verification
    const newpswd = req.body.newpswd
    const aginNewpswd = req.body.aginNewpswd

    config.query(updatesql, [newpswd, username],
        function (err, results, fields) {
            if (err) {
                console.log("錯誤")
                // } else {
                //     console.log("你好");
                // }
            } else if (randomNumber == verification) {
                if (newpswd == aginNewpswd) {
                    // console.log("變更密碼");
                    res.send("變更密碼成功! 請重新登入")
                } else {
                    // console.log("兩組密碼不相等");
                    res.send("兩次密碼需要相等!")
                }
            } else if (randomNumber != verification) {
                res.send("驗證碼錯誤，請重新查看信箱")
            }
        });
});

module.exports = page;