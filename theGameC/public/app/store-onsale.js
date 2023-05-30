window.onload = function () {
    changebox(1);
};

function changebox(index) {
    var onsaleWrapper = document.getElementById('onsaleWrapper');
    var onsaleItems = onsaleWrapper.getElementsByClassName('onsale');

    for (var i = 0; i < onsaleItems.length; i++) {
        onsaleItems[i].style.display = (i === index - 1) ? 'block' : 'none';
        var onsaleButtons = onsaleItems[i].getElementsByClassName('onsale-btn');
        for (var j = 0; j < onsaleButtons.length; j++) {
            if (j === index - 1) {
                onsaleButtons[j].classList.add('selected');
            } else {
                onsaleButtons[j].classList.remove('selected');
            }
        }
    }
}

// 背景蘭

window.onload = function () {
    changebox(1);
};

function changebox(index) {
    var onsaleWrapper = document.getElementById('onsaleWrapper');
    var onsaleItems = onsaleWrapper.getElementsByClassName('onsale');

    for (var i = 0; i < onsaleItems.length; i++) {
        onsaleItems[i].style.display = (i === index - 1) ? 'block' : 'none';
        var onsaleButtons = onsaleItems[i].getElementsByClassName('onsale-btn');
        for (var j = 0; j < onsaleButtons.length; j++) {
            // Reset all buttons to white color
            onsaleButtons[j].style.backgroundColor = '#ffffff';
            if (j === index - 1) {
                onsaleButtons[j].classList.add('selected');
                // Set the selected button to #002141
                onsaleButtons[j].style.backgroundColor = '#002141';
            } else {
                onsaleButtons[j].classList.remove('selected');
            }
        }
    }
}



