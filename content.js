// content.js
console.log("AdShield 廣告清掃機器人已啟動！");

// 這裡放入常見的廣告元素 class 名稱或 ID
// 這些是網路上廣告商很常使用的名稱
const adSelectors = [
    '.adsbygoogle',          // Google AdSense 廣告
    'div[id^="google_ads_"]', // ID 開頭是 google_ads_ 的區塊
    '.ad-banner',            // 常見的廣告橫幅名稱
    '.ad-container',         // 廣告容器
    '[aria-label="Ads"]',    // 標記為廣告的區域
    '.doubleclick'           // DoubleClick 相關
];

function removeAds() {
    // 把所有選擇器串起來變成一個大字串
    const selectorString = adSelectors.join(', ');
    
    // 抓出網頁上所有符合這些特徵的元素
    const ads = document.querySelectorAll(selectorString);

    if (ads.length > 0) {
        console.log(`偵測到 ${ads.length} 個廣告元素，正在清除...`);
        ads.forEach(ad => {
            // 方法 A: 直接移除 (比較暴力，但也乾淨)
             ad.remove();
             
            // 方法 B: 隱藏 (比較安全，怕誤刪內容可以用這個)
            // ad.style.display = 'none';
            // ad.style.visibility = 'hidden';
        });
    }
}

// 1. 網頁載入時先清一次
removeAds();

// 2. 因為很多網站會「動態載入」廣告（滑到下面才跑出來）
// 所以我們要設一個定時器，每 2 秒檢查一次 (簡單暴力的做法)
setInterval(removeAds, 2000);
