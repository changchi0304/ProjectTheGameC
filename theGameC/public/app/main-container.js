document.addEventListener('DOMContentLoaded', function () {
    var gameContainer = document.querySelector('.game-container');
    var sections = gameContainer.querySelectorAll('.game-section');
    var timeout;
    var isMouseInside = false; // 用于跟踪鼠标是否在容器内部
  
    sections.forEach(section => {
      var contentItems = section.querySelectorAll('.contentleftitem, .contentleft p, .contentleftitem p');
      var contentRight = section.querySelector('.contentright');
  
      section.addEventListener('mouseenter', function (event) {
        event.stopPropagation();
        isMouseInside = true; // 鼠标进入容器内部
        sections.forEach(s => {
          s.classList.remove('open');
          s.querySelectorAll('.contentleft p').forEach(p => {
            p.style.display = 'none';
          });
        });
        section.classList.add('open');
        contentItems.forEach(item => {
          item.style.visibility = 'visible';
          item.style.opacity = '1';
        });
        section.querySelectorAll('.contentleft p').forEach(p => {
          p.style.display = 'block';
        });
        clearTimeout(timeout);
      });
  
      section.addEventListener('mouseleave', function (event) {
        if (!isMouseInside) {
          section.classList.remove('open');
          setTimeout(function () {
            contentItems.forEach(item => {
              item.style.visibility = 'hidden';
              item.style.opacity = '0';
            });
            section.querySelectorAll('.contentleft p').forEach(p => {
              p.style.display = 'none';
            });
            var allClosed = Array.from(sections).every(s => !s.classList.contains('open'));
            if (allClosed) {
              setTimeout(function () {
                contentRight.classList.remove('open');
              }, 100);
            }
          }, 100);
        }
      });
    });
  
    gameContainer.addEventListener('mouseleave', function (event) {
        console.log("離開")
      isMouseInside = false; 
      sections.forEach(section => {
        section.classList.remove('open');
        setTimeout(function () {
          section.querySelectorAll('.contentleftitem, .contentleft p, .contentleftitem p').forEach(item => {
            item.style.visibility = 'hidden';
            item.style.opacity = '0';
          });
          section.querySelector('.contentright').classList.remove('contentright-float');
          section.querySelectorAll('.contentleft p').forEach(p => {
            p.style.display = 'none';
          });
        }, 100);
      });
    });
  });
  