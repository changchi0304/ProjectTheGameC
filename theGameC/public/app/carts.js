
// 拖曳
var items = document.querySelectorAll(".item");
var cartContainer = document.querySelector(".cart-container");
var cart = document.querySelector(".cart");
var cartItems = document.querySelector(".cart-items");
var wrapper = document.querySelector(".wrapper");
var categoryButtons = document.querySelectorAll('.category-button');
var contentWrappers = document.querySelectorAll('.content-wrapper');


// 儲存拖曳的物品
var draggingItem = null;

// 拖曳事件
items.forEach((item) => {
    item.addEventListener("dragstart", () => {
        console.log("Drag start: " + item.id);
        console.log("Over class present before adding: " + cart.classList.contains("over"));
        item.classList.add("dragging");
        draggingItem = item;
        cartContainer.classList.add("active");
        cart.classList.add("over");
        console.log("Over class present after adding: " + cart.classList.contains("over"));
    });
    
    item.addEventListener("dragend", () => {
        console.log("Drag end: " + item.id);
        console.log("Over class present before removing: " + cart.classList.contains("over"));
        item.classList.remove("dragging");
        draggingItem = null;
        cartContainer.classList.remove("active");
        cart.classList.remove("over");
        console.log("Over class present after removing: " + cart.classList.contains("over"));
    });
    
});

// 滑鼠放入購物車不消失
  cart.addEventListener("mouseover", () => {
      cartContainer.style.right = "10px";
  });

  cart.addEventListener("mouseout", () => {
      cartContainer.style.right = "-25%";
});


cart.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (draggingItem) {
        var cartRect = cart.getBoundingClientRect();
        var x = e.clientX;
        var y = e.clientY;
        var isOverlapping =
            x > cartRect.left && x < cartRect.right && y > cartRect.top && y < cartRect.bottom;
        if (isOverlapping) {
            if (!cart.classList.contains("over")) {
                cart.classList.add("over");
            }
        } else {
            if (cart.classList.contains("over")) {
                cart.classList.remove("over");
            }
        }
    }
});



cart.addEventListener("dragleave", () => {
    cart.classList.remove("over");
});


// 拖曳事件
cart.addEventListener("drop", e => {
    e.preventDefault();
    if (draggingItem) {
      var clonedItem = draggingItem.cloneNode(true);
      var removeBtn = clonedItem.querySelector('.remove-item'); // remove-item 元素
      cartItems.appendChild(clonedItem);
  
      var productId = clonedItem.dataset.productId;  // 商品編號
      var userId = clonedItem.dataset.userid;
      var price = parseInt(clonedItem.dataset.price); // 商品價格
  
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/store/insertProduct", true);
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          var cartItems = JSON.parse(xhr.responseText);
          if (cartItems.productId) {
            window.cartItemIds.push(cartItems.productId);
        }        
          console.log("Updated cartItemIds: ", window.cartItemIds);
        } else {
          console.log("Error: " + xhr.status);
        }
      };
  
      xhr.onerror = function() {
        console.log("Request failed");
      };
  
      var data = {
        userId: userId,
        productId: productId,
        price: price
      };
      xhr.send(JSON.stringify(data));

        clonedItem.addEventListener("dragstart", () => {
            clonedItem.classList.add("dragging");
            draggingItem = clonedItem;
        });

        clonedItem.addEventListener("dragend", () => {
            if (!cart.contains(clonedItem)) {
                clonedItem.remove();
                document.querySelector('.totel').textContent = `NT$${calculateTotal()}`;
            }
            clonedItem.classList.remove("dragging");
            draggingItem = null;
        });

        // 新增 click 刪除事件監聽器
        removeBtn.addEventListener('click', () => {
            clonedItem.remove();
            document.querySelector('.totel').textContent = `NT$${calculateTotal()}`;
            
        });

        // 添加刪除事件的功能到新加入的商品元素
        addRemoveFunctionality(clonedItem);

        cart.classList.remove("over");
        document.querySelector('.totel').textContent = `NT$${calculateTotal()}`;
    }
    
    // 在商品成功添加到購物車之後，將原本的商品添加"in-cart" class
    draggingItem.classList.add("in-cart");
    var purchasedLabel = document.createElement("div");
    purchasedLabel.classList.add("purchased-label");
    purchasedLabel.textContent = "已放入購物車";
    draggingItem.appendChild(purchasedLabel);
});


// 新刪除事件把刪除功能到購物車
function addRemoveFunctionality(cartItem) {
    console.log(cartItem + "成功");
    
    var removeBtn = cartItem.querySelector('.remove-item');
    if (removeBtn && !removeBtn.onclick) {
        removeBtn.addEventListener('click', () => {
            console.log("ok");
            var productId = cartItem.dataset.productId;  // 商品編號
            var userId = cartItem.dataset.userid;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/store/removeProduct", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // 在刪除成功後移除原始商品的 "in-cart" class
                    var originalItem = document.querySelector(`.item[data-product-id="${productId}"]`);
                    if (originalItem) {
                        originalItem.classList.remove("in-cart");
                    }
                } else {
                    console.log("Error: " + xhr.status);
                }
            };
            xhr.onerror = function() {
                console.log("Request failed");
            };
            var data = {
                userId: userId,
                productId: productId
            };
            xhr.send(JSON.stringify(data));

            cartItem.remove();
            document.querySelector('.totel').textContent = `NT$${calculateTotal()}`;
            var originalItem = document.querySelector(`.item[data-product-id="${productId}"]`);
            if (originalItem) {
                var purchasedLabel = originalItem.querySelector('.purchased-label');
                if (purchasedLabel) {
                    originalItem.removeChild(purchasedLabel);
                }
            }
        });
    }
}


wrapper.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (draggingItem) {
        var cartRect = cartContainer.getBoundingClientRect();
        var x = e.clientX;
        var y = e.clientY;
        var isOverlapping =
            x > cartRect.left && x < cartRect.right && y > cartRect.top && y < cartRect.bottom;
        if (isOverlapping) {
            cartContainer.classList.add("over");
        } else {
            cartContainer.classList.remove("over");
        }
    }
     cartContainer.style.right = "10px";
     sideButtons.forEach((button) => {
         button.classList.add("hidden");
     });
});

wrapper.addEventListener("dragleave", () => {
    cartContainer.classList.remove("over");
});

wrapper.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggingItem && cart.contains(draggingItem)) {
        draggingItem.remove();
        document.querySelector('.totel').textContent = `NT$${calculateTotal()}`;
    }
});


function toggleCart() {
    var cartContainer = document.querySelector(".cart-container");
    var sideButtons = document.querySelectorAll(".side-button");
    if (cartContainer.style.right === "10px") {
        cartContainer.style.right = "-25%";
        sideButtons.forEach((button) => {
            button.classList.remove("hidden");
        });
    } else {
        cartContainer.style.right = "10px";
        sideButtons.forEach((button) => {
            button.classList.add("hidden");
        });
    }
}

items.forEach(item => {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});

document.addEventListener("click", (e) => {
    var cartContainer = document.querySelector(".cart-container");
    var sideButtons = document.querySelectorAll(".side-button");
    if (
        !e.target.closest(".cart-container") &&
        !e.target.closest(".side-button") &&
        cartContainer.style.right === "10px"
    ) {
        cartContainer.style.right = "-25%";
        sideButtons.forEach((button) => {
            button.classList.remove("hidden");
        });
    }
});
function calculateTotal() {
    let total = 0;
    const cartItemPrices = document.querySelectorAll('.cart .item h3');
    cartItemPrices.forEach((itemPrice) => {
        total += parseInt(itemPrice.textContent.replace('NT$', '').replace(',', '').trim());
    });
    return total;
}



 
