const fs = require('fs');

console.log("開始讀取 EasyList 情報...");
const rawData = fs.readFileSync('easylist.txt', 'utf8');
const lines = rawData.split('\n');

let globalLineIndex = 0;
let globalIdCounter = 1;

// 2. 外層迴圈：最多切 50 個檔案
for (let fileNum = 1; fileNum <= 50; fileNum++) {
    const rules = [];
    let currentFileRuleCount = 0; // 計算「目前這個檔案」裝了幾條規則

    console.log(`開始製作第 ${fileNum} 個檔案...`);

    // 3. 內層迴圈：繼續從上次斷掉的行數 (globalLineIndex) 往下讀
    while (globalLineIndex < lines.length) {
        const line = lines[globalLineIndex].trim();
        globalLineIndex++; // 讀完一行，進度條往前推一格

        // 過濾條件
        if (line.startsWith('||') && line.includes('^') && !line.startsWith('!')) {
            rules.push({
                "id": globalIdCounter, // 使用全域不重複的 ID
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": line,
                    "resourceTypes": ["image", "script", "sub_frame"]
                }
            });
            
            globalIdCounter++;
            currentFileRuleCount++;
        }

        // 4. 如果「目前這個檔案」裝滿 29000 條了，就中斷內層迴圈，準備打包存檔
        if (currentFileRuleCount >= 29990) {
            break;
        }
    }

    // 5. 如果這個檔案裡面有裝東西才存檔
    if (rules.length > 0) {
        const jsonOutput = JSON.stringify(rules, null, 4);
        
        // 🔥 關鍵修正：檔名使用變數 (動態檔名)
        const fileName = `rules_${fileNum}.json`;
        fs.writeFileSync(fileName, jsonOutput);
        console.log(`✅ 成功產出 ${fileName} (內含 ${rules.length} 條規則)`);
    }

    // 6. 如果 txt 已經全部讀完了，就提早結束外層的 50 次迴圈
    if (globalLineIndex >= lines.length) {
        console.log("情報清單已全數轉換完畢！");
        break;
    }
}