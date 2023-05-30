/* 回到首頁 */
function goIndex() {
  window.location = "/";
}
//-----------------------------------------------------------
//-----------------------------------------------------------

/* header 滾動效果 */
const header = document.querySelector("header");
let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
  const currentScrollPosition = window.pageYOffset;
  // 向下滾動頁面時，window.pageYOffset的值會逐漸增加
  // 向上滾動頁面時，window.pageYOffset的值會逐漸減小

  if (currentScrollPosition <= 0) {
    header.classList.remove("header_hidden");
    // 當在網頁最上方時必顯示
  } else if (currentScrollPosition > lastScrollPosition + 3) {
    header.classList.add("header_hidden");
    // scroll 觸發後的位置 > 原先位置，表示往下滾動，故隱藏 nav
  } else if (currentScrollPosition < lastScrollPosition - 3) {
    header.classList.remove("header_hidden");
    // scroll 觸發後的位置 < 原先位置，表示往上滾動，故顯示 nav
  }

  lastScrollPosition = currentScrollPosition;
  // 滾輪事件結束後，讓原先位置等於新位置，
  // 用於下次觸發滾輪事件時可做為判斷上滑或下滑的依據
});

//-----------------------------------------------------------
//-----------------------------------------------------------
