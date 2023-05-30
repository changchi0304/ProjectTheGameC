// 遊戲種類圖片最外框 
// const images = document.querySelectorAll('.image-container img');

// 宣告所有遊戲種類按鈕 
// const shooting = document.querySelector('#shooting');
// const action = document.querySelector('#action');
// const racing = document.querySelector('#racing');



//射擊遊戲
// const shootingimg = ['/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg', '/img/Games/AVA/1.jpg'];
// shooting.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = shootingimg[index];
    // });
// });

//動作冒險
// const actionimg = ['/img/Games/Elsword/cover.jpg', '/img/Games/Elsword/cover.jpg', '/img/Games/Elsword/cover.jpg', '/img/Games/Elsword/cover.jpg', '/img/Games/Elsword/cover.jpg', '/img/Games/Elsword/cover.jpg', '', '', ''];
// action.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = actionimg[index];
    // });
// });

//開放休閒
// const casualimg = ['/img/Games/MapleStory/cover.jpg', '/img/Games/MapleStory/cover.jpg', '/img/Games/MapleStory/cover.jpg', '/img/Games/MapleStory/cover.jpg', '/img/Games/MapleStory/cover.jpg', '', '', '', ''];
// casual.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = casualimg[index];
    // });
// });

//競速遊戲
// const racingimg = ['/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '../public/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg', '/img/Games/CrazyArcade/cover.jpg'];
// racing.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = racingimg[index];
    // })
// })

//3D模擬
// const the3dimg = ['/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp', '/img/Games/SoulWorker/cover.webp'];
// the3d.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = the3dimg[index];
    // })
// })

//運動競技
// const sportsimg = ['/img/Games/MaguMagu/4.png', '/img/Games/MaguMagu/4.png', '/img/Games/MaguMagu/4.png', ''];
// sports.addEventListener('click', function () {
    // images.forEach((image, index) => {
        // image.src = sportsimg[index];
    // })
// })


/* 最下方輪播圖 */
document.addEventListener( 'DOMContentLoaded', function () {
    var main = new Splide( '#main-carousel', {
      type      : 'fade',
      rewind    : true,
      pagination: false,
      arrows    : false,
    } );
  
  
    var thumbnails = new Splide( '#thumbnail-carousel', {
      fixedWidth  : 100,
      fixedHeight : 60,
      gap         : 10,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      breakpoints : {
        600: {
          fixedWidth : 60,
          fixedHeight: 44,
        },
      },
    } );
  
  
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  } );




