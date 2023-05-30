$(document).ready(function () {
  $(".btnsign").click(function () {
    $("#loginpage").fadeOut(0);
    $("#signbox").fadeIn(800);
    $(".btnbg").css("top", "95px");
    $(".btnsign").css("color", "#1C3D5C");
    $(".btnlogin").css("color", "white");
  });
  $(".btnlogin").click(function () {
    $("#loginpage").fadeIn(800);
    $("#signbox").fadeOut(0);
    $(".btnbg").css("top", "3px");
    $(".btnlogin").css("color", "#1C3D5C");
    $(".btnsign").css("color", "white");
  });

  $("#eyeclose").click(function () {
    $("#eyeopen").css("display", "block");
    $("#eyeclose").css("display", "none");
    $("#password1").attr("type", "text");
  });
  $("#eyeopen").click(function () {
    $("#eyeopen").css("display", "none");
    $("#eyeclose").css("display", "block");
    $("#password1").attr("type", "password");
  });
  $("#eyeclose2").click(function () {
    $("#eyeopen2").css("display", "block");
    $("#eyeclose2").css("display", "none");
    $("#password2").attr("type", "text");
  });
  $("#eyeopen2").click(function () {
    $("#eyeopen2").css("display", "none");
    $("#eyeclose2").css("display", "block");
    $("#password2").attr("type", "password");
  });
  $("#eyeclose3").click(function () {
    $("#eyeopen3").css("display", "block");
    $("#eyeclose3").css("display", "none");
    $("#password3").attr("type", "text");
  });
  $("#eyeopen3").click(function () {
    $("#eyeopen3").css("display", "none");
    $("#eyeclose3").css("display", "block");
    $("#password3").attr("type", "password");
  });

  // 忘記密碼
  $(".popup-btn").click(function () {
    var href = $(this).attr("href");
    $(href).fadeIn(250);
    $(href)
      .children$("popup-box")
      .removeClass("transform-out")
      .addClass("transform-in");
    e.preventDefault();
  });

  $(".popup-close").click(function () {
    closeWindow();
  });
  // $(".popup-wrap").click(function(){
  //   closeWindow();
  // })
  function closeWindow() {
    $(".popup-wrap").fadeOut(200);
    $(".popup-box").removeClass("transform-in").addClass("transform-out");
    event.preventDefault();
  }
  // 寄驗證碼到信箱
  $("#Verification_But").on("click", function () {
    event.preventDefault();
    $.ajax({
      url: "/login/getVerification",
      type: "POST",
      data: {
        username: $("input[name='fgUsername']").val(),
      },
    }).done(function (data) {
      console.log(data);
      // $('#updatePwd').on('click', function () {
      alert(data);
      // })
    });
  });
  // 更改密碼
  $("#forgetBox").on("submit", function () {
    event.preventDefault();
    $.ajax({
      url: "/login/updatePswd",
      type: "POST",
      data: {
        username: $("input[id='fgUsername']").val(),
        verification: $("input[id='Verification']").val(),
        newpswd: $("input[id='fgNewpad']").val(),
        aginNewpswd: $("input[id='aginNewpswd']").val(),
      },
    }).done(function (data) {
      if (data === "變更密碼成功! 請重新登入") {
        alert(data);
        window.location.assign("http://localhost/login");
        // console.log(data)
      } else {
        // console.log(data)
        alert(data);
      }
      // $('#updatePwd').on('click', function () {
      // })
    });
  });

  // 註冊鈕
  $("#signinForm").on("submit", function () {
    // const userId = $("#user_id").val();
    event.preventDefault();

    if ($("#password2").val() === $("#password3").val()) {
      $.ajax({
        url: "/login/signin",
        type: "POST",
        data: {
          user_id: parseInt($("input[name='user_id']").val()) + 1,
          username: $("input[name='username']").val(),
          password: $("input[id='password2']").val(),
          email: $("input[name='email']").val(),
          phone: $("input[name='phone']").val(),
          birthday: $("input[name='birthday']").val(),
        },
      }).done(function (data) {
        if (data == "success") {
          alert("註冊成功，請登入");
          location.reload();
          console.log(data);
        } else {
          // data.includes('username')?alert("內容有誤-帳號"):
          // data.includes('email')?   alert("內容有誤-信箱"):alert("內容有誤-其它錯誤")
          if (data.includes("username")) {
            alert("該帳號已有人使用");
          } else if (data.includes("email")) {
            alert("該信箱已有人使用");
          } else {
            alert("請確認表格皆有填寫正確");
            console.log(data);
          }
        }
        // location.reload();
      });
      // console.log(data);
    } else {
      alert("請確認兩次密碼輸入一致");
      // location.reload();
    }
  });
  //登入
  $("#loginForm").on("submit", function () {
    event.preventDefault();
    $.ajax({
      url: "/login/getUsername",
      type: "POST",
      data: {
        username: $("input[id='loginUsername']").val(),
        password: $("input[id='password1']").val(),
      },
    }).done(function (data) {
      console.log(data);

      if (data == "success") {
        alert("登入成功");
        window.location.assign("http://localhost/"); //登入成功後，自動導向哪邊
      } else {
        alert("帳號或密碼錯誤");
        // location.reload();
      }
    });
  });
});
