document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const statusText = document.getElementById('status-text');

    toggleBtn.addEventListener('change', async (e) => {
        const isEnabled = e.target.checked;

        if (isEnabled) {
            statusText.textContent = "防護運作中";
            statusText.style.color = "#2ed573";
        } else {
            statusText.textContent = "攔截已暫停";
            statusText.style.color = "#ff4757";
        }

        try {
            if (window.chrome && chrome.declarativeNetRequest) {
                await chrome.declarativeNetRequest.updateEnabledRulesets({
                    enableRulesetIds: isEnabled ? ["ruleset_1"] : [],
                    disableRulesetIds: isEnabled ? [] : ["ruleset_1"]
                });
            }
        } catch (error) {
            console.log("此環境非真實瀏覽器擴充功能，無法呼叫 Chrome API");
        }
    });
});