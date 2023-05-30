// 遊戲warpper輪播
categoryButtons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        button.style.borderColor = 'red';
    });
    button.addEventListener('mouseout', () => {
        if (!button.classList.contains('active')) {
            button.style.borderColor = '';
        }
    });
});


categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        var index = parseInt(button.getAttribute('data-index'));

        categoryButtons.forEach((btn) => {
            btn.classList.remove('active');
            btn.style.borderColor = ''; 
        });

        button.classList.add('active');
        button.style.borderColor = 'red'; 

        contentWrappers.forEach((contentWrapper, wrapperIndex) => {
            if (index === wrapperIndex + 1) {
                contentWrapper.style.display = 'grid';
            } else {
                contentWrapper.style.display = 'none';
            }
        });
    });
});

contentWrappers.forEach((contentWrapper, index) => {
    if (index !== 0) {
        contentWrapper.style.display = 'none';
    }
});