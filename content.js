// content.js
console.log("AdShield 內容腳本已載入！");

// 範例：移除 Google 首頁的 Logo (這就是廣告阻擋器移除 DIV 的原理)
// Google Logo 的 class 名稱通常是 .lnXdpd 或 img[alt="Google"]
const adBanners = document.querySelectorAll('.lnXdpd, img[alt="Google"]');

adBanners.forEach(banner => {
    // 把它設為隱藏
    banner.style.display = 'none';
    // 或是直接移除
    // banner.remove(); 
    console.log("已隱藏一個廣告元素！");
});
