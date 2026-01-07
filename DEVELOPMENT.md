# 故事圖畫閱讀器 - 完整開發指南 🚀

## 📋 目錄

1. [環境需求](#環境需求)
2. [安裝步驟](#安裝步驟)
3. [開發流程](#開發流程)
4. [測試](#測試)
5. [部署](#部署)
6. [故障排除](#故障排除)

---

## 🛠️ 環境需求

### 必要軟體

```
Node.js: >= 18.0.0
npm: >= 9.0.0
```

### 檢查版本

```bash
node --version
npm --version
```

### 安裝 Node.js

**Windows / macOS:**
- 訪問 https://nodejs.org/
- 下載 LTS 版本
- 執行安裝程式

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 📦 安裝步驟

### 1. 解壓專案

```bash
# 將專案解壓到你的工作目錄
cd story-reader
```

### 2. 安裝依賴

```bash
npm install
```

**預期輸出：**
```
added 150+ packages in 30s
```

**如果遇到錯誤：**
```bash
# 清除快取
npm cache clean --force

# 刪除 node_modules
rm -rf node_modules

# 重新安裝
npm install
```

### 3. 確認安裝

```bash
# 檢查專案結構
ls -la

# 應該看到：
# node_modules/  (依賴套件)
# public/
# src/
# package.json
# vite.config.js
```

---

## 💻 開發流程

### 啟動開發伺服器

```bash
npm run dev
```

**成功輸出：**
```
  VITE v6.0.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 訪問應用程式

在瀏覽器打開：
```
http://localhost:5173
```

### 熱重載（Hot Reload）

- 修改程式碼後自動重新載入
- 無需手動重新整理
- 保留應用程式狀態

### 停止開發伺服器

按 `Ctrl + C`

---

## 🔧 開發技巧

### 修改配色

編輯 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // 藍色 → 改成你想要的顏色
      success: '#10B981',    // 綠色
      error: '#EF4444',      // 紅色
    }
  },
}
```

### 修改按鈕大小

編輯 `src/index.css`：

```css
.btn-large {
  @apply h-14 px-8 text-lg;  /* 改 h-14 調整高度 */
}
```

### 新增組件

```bash
# 在 src/components/ 目錄下新增 .jsx 檔案
touch src/components/MyComponent.jsx
```

---

## 🧪 測試

### 功能測試清單

#### 1. 檔案載入測試

```
□ 上傳本地 JSON 檔案
□ 載入雲端連結
□ 錯誤處理（格式錯誤）
□ 大檔案載入（10MB+）
```

#### 2. 閱讀介面測試

```
□ 段落顯示正常
□ 圖片顯示正常
□ 點擊圖片左側：上一段
□ 點擊圖片右側：下一段
□ 鍵盤 ← → 鍵翻頁
□ 底部按鈕翻頁
```

#### 3. 答題功能測試

```
□ 填空題輸入和提交
□ 填空題答案檢查
□ 選擇題選擇和提交
□ 選擇題答案檢查
□ 重新作答功能
```

#### 4. 響應式測試

```
□ 桌面（1920x1080）
□ 平板橫向（1024x768）
□ 平板直向（768x1024）
□ 手機（375x667）
```

### 使用測試檔案

專案包含 `test-data.json`，用於快速測試：

```bash
# 啟動開發伺服器
npm run dev

# 在瀏覽器中：
1. 點「選擇 JSON 檔案」
2. 選擇 test-data.json
3. 測試所有功能
```

### 瀏覽器測試

**推薦測試瀏覽器：**
- Chrome (最新版)
- Safari (iOS)
- Firefox (最新版)
- Edge (最新版)

---

## 📱 裝置測試

### Chrome DevTools

```
1. F12 開啟開發者工具
2. 按 Ctrl + Shift + M（Toggle device toolbar）
3. 選擇裝置（iPad, iPhone 等）
4. 測試觸控和響應式
```

### 實際裝置測試

```bash
# 啟動並暴露到區域網路
npm run dev -- --host

# 輸出會顯示：
# Network: http://192.168.1.100:5173/

# 在平板/手機瀏覽器輸入這個網址
```

---

## 🚀 部署

### 建置生產版本

```bash
npm run build
```

**成功輸出：**
```
vite v6.0.5 building for production...
✓ 150 modules transformed.
dist/index.html                   1.2 kB
dist/assets/index-abc123.css     15.3 kB
dist/assets/index-def456.js     145.8 kB
✓ built in 3.5s
```

**生成的檔案：**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
```

### 預覽生產版本

```bash
npm run preview
```

在瀏覽器打開顯示的網址（通常是 http://localhost:4173）

---

## 🌐 部署到 GitHub Pages

### 步驟 1：建立 GitHub Repository

```bash
# 初始化 Git
git init

# 添加檔案
git add .

# 提交
git commit -m "Initial commit"

# 連接遠端倉庫
git remote add origin https://github.com/你的帳號/story-reader.git

# 推送
git push -u origin main
```

### 步驟 2：設定 GitHub Pages

1. 打開 GitHub Repository
2. 設定 → Pages
3. Source：GitHub Actions
4. 創建 workflow file

### 步驟 3：創建 GitHub Actions

創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          npm install
          npm run build
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 步驟 4：推送並等待部署

```bash
git add .
git commit -m "Add GitHub Actions"
git push

# 等待幾分鐘，網站會部署到：
# https://你的帳號.github.io/story-reader/
```

---

## 🌐 部署到 Netlify

### 方法 A：透過 Git

1. 登入 Netlify
2. New site from Git
3. 選擇 GitHub Repository
4. 設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

### 方法 B：手動上傳

```bash
# 建置
npm run build

# 壓縮 dist 資料夾
zip -r dist.zip dist/

# 在 Netlify:
# 1. 登入
# 2. Drag and drop dist.zip
# 3. 完成！
```

### 自訂網域

```
1. Netlify Dashboard → Domain settings
2. Add custom domain
3. 按照指示設定 DNS
```

---

## 🌐 部署到 Vercel

### 方法 A：透過 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel

# 生產環境
vercel --prod
```

### 方法 B：透過網頁

1. 訪問 https://vercel.com
2. Import Git Repository
3. 選擇專案
4. 自動偵測設定
5. Deploy

---

## 🐛 故障排除

### 問題 1：npm install 失敗

**錯誤：**
```
npm ERR! code EACCES
```

**解決：**
```bash
# 清除 npm 快取
npm cache clean --force

# 使用 sudo (Linux/Mac)
sudo npm install

# 或修改權限
sudo chown -R $USER ~/.npm
```

### 問題 2：Port 已被佔用

**錯誤：**
```
Port 5173 is in use
```

**解決：**
```bash
# 方法 A：關閉佔用的程序
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID號碼] /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9

# 方法 B：使用其他 Port
npm run dev -- --port 3000
```

### 問題 3：建置失敗

**錯誤：**
```
Module not found
```

**解決：**
```bash
# 刪除 node_modules
rm -rf node_modules

# 刪除 package-lock.json
rm package-lock.json

# 重新安裝
npm install

# 重新建置
npm run build
```

### 問題 4：樣式沒有套用

**解決：**
```bash
# 確認 Tailwind 設定
cat tailwind.config.js

# 確認 PostCSS 設定
cat postcss.config.js

# 清除快取並重啟
rm -rf node_modules/.vite
npm run dev
```

### 問題 5：圖片無法顯示

**檢查：**
1. JSON 檔案中的 image 是否為 Base64 格式
2. Base64 字串是否完整
3. 是否包含 `data:image/...;base64,` 前綴

**測試：**
```javascript
// 在瀏覽器 Console 測試
const img = new Image();
img.src = '你的Base64字串';
img.onload = () => console.log('✓ 圖片格式正確');
img.onerror = () => console.log('✗ 圖片格式錯誤');
```

---

## 📊 效能優化

### 檢查 Bundle 大小

```bash
npm run build

# 查看 dist/assets/ 檔案大小
ls -lh dist/assets/
```

### 優化建議

1. **圖片壓縮**
   - 使用 70-80% JPEG 品質
   - 限制圖片寬度 1200px

2. **程式碼分割**
   - Vite 自動處理
   - 按需載入組件

3. **快取策略**
   - 使用 CDN
   - 設定適當的 Cache-Control

---

## 📝 版本更新

### 更新依賴

```bash
# 檢查過時的套件
npm outdated

# 更新全部
npm update

# 更新特定套件
npm update react react-dom
```

### 版本號管理

編輯 `package.json`：
```json
{
  "version": "1.0.0"  // 遵循 Semantic Versioning
}
```

---

## 🎓 學習資源

### React
- 官方文件：https://react.dev
- 教學：https://react.dev/learn

### Vite
- 官方文件：https://vitejs.dev
- 指南：https://vitejs.dev/guide

### Tailwind CSS
- 官方文件：https://tailwindcss.com
- 組件範例：https://tailwindui.com

---

## 💬 獲取幫助

### 社群資源

- React Discord
- Stack Overflow
- GitHub Issues

### 文件資源

- README.md（專案說明）
- 本指南（開發指南）
- 組件內的註解

---

## ✅ 檢查清單

### 開發前
```
□ 安裝 Node.js
□ 複製專案檔案
□ 執行 npm install
□ 啟動開發伺服器
```

### 開發中
```
□ 測試功能
□ 檢查響應式
□ 瀏覽器相容性
□ 效能測試
```

### 部署前
```
□ npm run build 成功
□ npm run preview 測試
□ 檢查 dist/ 檔案
□ 測試生產版本
```

### 部署後
```
□ 訪問部署網址
□ 測試所有功能
□ 檢查載入速度
□ 行動裝置測試
```

---

**祝開發順利！** 🚀✨

如有問題，請參考故障排除章節或查閱官方文件。
