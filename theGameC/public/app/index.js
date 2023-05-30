$(document).ready(function () {
    // 啟動aos的
    AOS.init();

    // 熱門商品抽頁效果
    $('#picimg1').click(function () {
        $('#text2').fadeOut(0);
        $('#text3').fadeOut(0);
        $('#text4').fadeOut(0);
        $('#text5').fadeOut(0);
        $('#text1').fadeIn(800);
    });
    $('#picimg2').click(function () {
        $('#text1').fadeOut(0);
        $('#text3').fadeOut(0);
        $('#text4').fadeOut(0);
        $('#text5').fadeOut(0);
        $('#text2').fadeIn(800);
    });
    $('#picimg3').click(function () {
        $('#text1').fadeOut(0);
        $('#text2').fadeOut(0);
        $('#text4').fadeOut(0);
        $('#text5').fadeOut(0);
        $('#text3').fadeIn(800);
    });
    $('#picimg4').click(function () {
        $('#text1').fadeOut(0);
        $('#text2').fadeOut(0);
        $('#text3').fadeOut(0);
        $('#text5').fadeOut(0);
        $('#text4').fadeIn(800);
    });
    $('#picimg5').click(function () {
        $('#text1').fadeOut(0);
        $('#text2').fadeOut(0);
        $('#text3').fadeOut(0);
        $('#text4').fadeOut(0);
        $('#text5').fadeIn(800);
    });




    //新聞列的bar按鈕
    $('#newsbut').click(function () {
        $('#newsButs').addClass("butfocus");
        $('#renewButs').removeClass("butfocus");
        $('#discountButs').removeClass("butfocus");
        $('#productButs').removeClass("butfocus");

        $("#renewAll").fadeOut(300);
        $("#discountAll").fadeOut(300);
        $("#productAll").fadeOut(300);
        $('#newsAll').fadeIn(800);
    });
    $('#renewbut').click(function () {
        $("#newsAll").fadeOut(300);
        $("#productAll").fadeOut(300);
        $("#discountAll").fadeOut(300);
        $('#renewAll').fadeIn(800);

        $('#renewButs').addClass("butfocus");
        $('#newsButs').removeClass("butfocus");
        $('#discountButs').removeClass("butfocus");
        $('#productButs').removeClass("butfocus");
    });
    $('#discountbut').click(function () {
        $("#newsAll").fadeOut(300);
        $("#productAll").fadeOut(300);
        $("#renewAll").fadeOut(300);
        $('#discountAll').fadeIn(800);

        $('#discountButs').addClass("butfocus");
        $('#newsButs').removeClass("butfocus");
        $('#renewButs').removeClass("butfocus");
        $('#productButs').removeClass("butfocus");
    });

    $('#productbut').click(function () {
        $("#newsAll").fadeOut(300);
        $("#discountAll").fadeOut(300);
        $("#renewAll").fadeOut(300);
        $('#productAll').fadeIn(800);

        $('#productButs').addClass("butfocus");
        $('#newsButs').removeClass("butfocus");
        $('#renewButs').removeClass("butfocus");
        $('#discountButs').removeClass("butfocus");
    });

    //設定倒數計時
    var targetDate = new Date("2023-06-10T00:00:00Z");

    function updateCountdown() {
        // 計算剩餘時間
        var timeDiff = targetDate - new Date();
        var seconds = Math.floor(timeDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        function padZero(num) {
            // 如果是個位數字則補0
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

        // 更新倒數計時器顯示
        $('.timebox1 .days').text(padZero(days));
        $('.timebox1 .hours').text(padZero(hours % 24));
        $('.timebox1 .minutes').text(padZero(minutes % 60));
        $('.timebox1 .seconds').text(padZero(seconds % 60));
    }

    // 初始呼叫一次
    updateCountdown();

    // 每秒更新一次
    setInterval(updateCountdown, 1000);



//寫sec2的按鈕控制
    document.querySelectorAll('.s_button')[1].onclick = () => {
        let lists = document.querySelectorAll('.sec2_item');
        document.querySelector('.sec2_slide').appendChild(lists[0])
    }
    document.querySelectorAll('.s_button')[0].onclick = () => {
        let lists = document.querySelectorAll('.sec2_item');
        document.querySelector('.sec2_slide').prepend(lists[lists.length - 1])
    }

    
});

