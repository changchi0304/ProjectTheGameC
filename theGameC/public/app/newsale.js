// 發售日期輪播
var images = document.querySelectorAll('.sliderimg img');
var gameinfos = document.querySelectorAll('.gameinf');
var buttons = document.querySelectorAll('.sliderbtn button');

// 為第一個按鈕添加 'button-active' 類別
buttons[0].classList.add('button-active');

function changeimage(index) {
    images.forEach((image) => {
        image.style.display = 'none';
    });
    gameinfos.forEach((gameinfo) => {
        gameinfo.style.display = 'none';
    });
    // 移除所有按鈕的 'button-active' 類別
    buttons.forEach((button) => {
        button.classList.remove('button-active');
    });
    // 為被點擊的按鈕添加 'button-active' 類別
    buttons[index - 1].classList.add('button-active');
    images[index - 1].style.display = 'block';
    gameinfos[index - 1].style.display = 'block';
}

changeimage(1);
