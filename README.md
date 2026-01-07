# 📚 故事圖畫閱讀器

簡單易用的閱讀和答題應用程式

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)

## ✨ 功能特色

- 📁 **載入 JSON 檔案** - 支援本地檔案和雲端連結
- 📖 **分段閱讀** - 清晰的段落顯示
- 🖼️ **圖片顯示** - 高品質圖片渲染
- 👆 **點擊翻頁** - 點擊圖片左右側快速翻頁
- ⌨️ **鍵盤支援** - 使用 ← → 鍵翻頁
- ✏️ **填空題** - 互動式填空練習
- ☑️ **選擇題** - 多選一答題模式
- 📱 **響應式設計** - 完美支援平板和手機
- 🎨 **美觀介面** - 現代化 UI 設計

## 🚀 快速開始

### 線上使用

直接訪問部署的網址即可使用（無需安裝）

### 本地開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 📖 使用方式

### 1. 載入檔案

**方法 A：本地檔案**
1. 點擊「選擇 JSON 檔案」
2. 選擇課文 JSON 檔案
3. 等待載入完成

**方法 B：雲端連結**
1. 點擊「從網址載入」
2. 輸入 JSON 檔案網址
3. 點擊「載入」

### 2. 閱讀和答題

- **翻頁方式：**
  - 點擊圖片左側：上一段
  - 點擊圖片右側：下一段
  - 使用底部大按鈕
  - 鍵盤 ← → 鍵

- **答題：**
  - 填空題：輸入答案後提交
  - 選擇題：選擇選項後提交
  - 可以重新作答

## 📝 JSON 格式

應用程式需要以下格式的 JSON 檔案：

```json
{
  "title": "課文標題",
  "paragraphs": [
    {
      "index": 0,
      "text": "段落內容文字...",
      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      "summary": "段落摘要（可選）",
      "quiz": {
        "cloze": [
          {
            "question": "填空題題目？",
            "answer": "正確答案"
          }
        ],
        "choices": [
          {
            "question": "選擇題題目？",
            "options": ["選項 A", "選項 B", "選項 C", "選項 D"],
            "correctIndex": 0
          }
        ]
      }
    }
  ]
}
```

### 欄位說明

| 欄位 | 類型 | 必要 | 說明 |
|------|------|------|------|
| `title` | string | 否 | 課文標題 |
| `paragraphs` | array | 是 | 段落陣列 |
| `paragraphs[].text` | string | 是 | 段落文字內容 |
| `paragraphs[].image` | string | 否 | Base64 圖片 |
| `paragraphs[].summary` | string | 否 | 段落摘要 |
| `paragraphs[].quiz` | object | 否 | 題目物件 |
| `quiz.cloze` | array | 否 | 填空題陣列 |
| `quiz.choices` | array | 否 | 選擇題陣列 |

## 🎨 功能展示

### 載入頁面

簡潔美觀的檔案載入介面

### 閱讀頁面

- **左側**：圖片（可點擊翻頁）
- **右側**：課文內容和題目
- **底部**：大按鈕導航

### 響應式設計

- **桌面/平板橫向**：雙欄布局
- **平板直向/手機**：單欄布局

## 💡 使用技巧

### 翻頁最佳實踐

1. **桌面**：滑鼠懸停在圖片上會顯示 ← → 提示
2. **平板**：直接點擊圖片左右兩側
3. **所有裝置**：使用底部大按鈕最清楚

### 檔案大小建議

- **最佳**：5-10 MB
- **良好**：10-20 MB
- **可用**：20-50 MB
- **慎用**：50 MB 以上

### 雲端載入注意事項

如果遇到 CORS 錯誤，建議：
1. 下載 JSON 檔案
2. 使用「選擇檔案」功能上傳

## 📱 相容性

### 瀏覽器

- ✅ Chrome / Edge（最新版）
- ✅ Safari（iOS 12+）
- ✅ Firefox（最新版）

### 裝置

- ✅ 桌面電腦
- ✅ iPad / Android 平板
- ✅ iPhone / Android 手機

## 🛠️ 技術棧

- **框架**：React 18.3
- **建置工具**：Vite 6.0
- **樣式**：Tailwind CSS 3.4
- **部署**：靜態網站（無後端）

## 📂 專案結構

```
story-reader/
├── public/            # 靜態資源
├── src/
│   ├── components/    # React 組件
│   │   ├── LoadPage.jsx          # 載入頁面
│   │   ├── ReaderPage.jsx        # 閱讀頁面
│   │   ├── ImageViewer.jsx       # 圖片檢視器
│   │   ├── TextContent.jsx       # 文字內容
│   │   ├── QuizSection.jsx       # 題目區域
│   │   ├── ClozeQuestion.jsx     # 填空題
│   │   ├── ChoiceQuestion.jsx    # 選擇題
│   │   └── Navigation.jsx        # 導航列
│   ├── App.jsx        # 主應用程式
│   ├── main.jsx       # 入口檔案
│   └── index.css      # 全域樣式
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 部署

### GitHub Pages

```bash
# 建置
npm run build

# 部署到 GitHub Pages
# （需先設定 GitHub Repository）
```

### Netlify

1. 連接 GitHub Repository
2. 建置命令：`npm run build`
3. 發布目錄：`dist`
4. 自動部署

### Vercel

1. 匯入 GitHub Repository
2. 自動偵測設定
3. 一鍵部署

## 🤝 使用情境

### 教室使用

老師可以：
1. 準備好 JSON 檔案
2. 上傳到雲端
3. 分享連結給學生
4. 學生直接使用

### 家庭學習

家長可以：
1. 下載 JSON 檔案
2. 在平板上開啟閱讀器
3. 讓孩子自主學習

### 行動學習

隨時隨地：
1. 打開瀏覽器
2. 載入檔案
3. 開始學習

## ⚙️ 設定

### 自訂樣式

編輯 `tailwind.config.js` 修改配色：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // 主色
      success: '#10B981',  // 成功色
      error: '#EF4444',    // 錯誤色
    }
  },
}
```

## 📄 授權

MIT License

## 🙏 致謝

感謝使用故事圖畫閱讀器！

---

**如有問題或建議，歡迎回饋！** 📚✨
