// content.js
console.log("AdShield 廣告清掃機器人 v2.0 - 針對特定版型優化");

const adSelectors = [
    '.adsbygoogle',
    'div[id^="google_ads_"]',
    '.ad-banner',
    '.ad-container',
    
    // 來自妳截圖的特定 ID (這是關鍵！)
    '#sda-top-center-iframe', 
    
    // 來自截圖內層顯示「廣告」文字的結構特徵
    'div[class*="text-dolphin"]' 
];

function removeAds() {
    const selectorString = adSelectors.join(', ');
    const ads = document.querySelectorAll(selectorString);

    ads.forEach(ad => {
        // 1. 針對截圖中的結構，如果這元素裡面包含「廣告」兩個字，也要處理
        if (ad.innerText.includes('廣告') || ad.id === 'sda-top-center-iframe') {
             destroyElement(ad);
             
             // 順便檢查它的父層，如果有 min-height 也要殺掉
             if(ad.parentElement && ad.parentElement.offsetHeight < 300) {
                 destroyElement(ad.parentElement);
             }
        } else {
             // 普通廣告處理
             destroyElement(ad);
        }
    });
}

// 毀滅元素的函式：專門對付 min-height
function destroyElement(el) {
    // 設定 !important 來覆蓋網頁原本的 Tailwind 樣式
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('visibility', 'hidden', 'important');
    el.style.setProperty('height', '0px', 'important');
    el.style.setProperty('min-height', '0px', 'important'); // 這一行專門對付妳截圖裡的 min-h-[250px]
    el.style.setProperty('margin', '0px', 'important');
    el.style.setProperty('padding', '0px', 'important');
    el.innerHTML = ''; // 清空內容
}

// 1. 執行清除
removeAds();

// 2. 監聽動態載入
const observer = new MutationObserver(() => {
    removeAds();
});
observer.observe(document.body, { childList: true, subtree: true });
