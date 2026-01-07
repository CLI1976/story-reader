import { useState, useRef } from 'react'

export default function LoadPage({ onFileUpload, onURLLoad, loading, error }) {
  const [url, setUrl] = useState('')
  const [showURLInput, setShowURLInput] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleURLSubmit = () => {
    onURLLoad(url)
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.json')) {
      onFileUpload(file)
    } else {
      alert('請拖放 JSON 檔案')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full">
        {/* 標題 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 故事圖畫閱讀器
          </h1>
          <p className="text-xl text-gray-600">
            簡單易用的閱讀和答題應用程式
          </p>
        </div>

        {/* 載入中 */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">正在載入檔案...</p>
            <p className="text-sm text-gray-500 mt-2">請稍候，可能需要幾秒鐘</p>
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-6">
            <p className="text-red-700 font-semibold mb-2">❌ 載入失敗</p>
            <p className="text-red-600 whitespace-pre-line">{error}</p>
          </div>
        )}

        {/* 載入選項 */}
        {!loading && (
          <div className="space-y-4">
            {/* 檔案上傳 */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📁</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  選擇 JSON 檔案
                </h2>
                <p className="text-gray-600 mb-4">
                  點擊選擇檔案，或將檔案拖曳到此處
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold">
                  <span>📂</span>
                  <span>瀏覽檔案</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* 分隔線 */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 font-semibold">或</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* URL 載入 */}
            {!showURLInput ? (
              <button
                onClick={() => setShowURLInput(true)}
                className="w-full bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🔗</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    從網址載入
                  </h2>
                  <p className="text-gray-600">
                    輸入 JSON 檔案的網址
                  </p>
                </div>
              </button>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🔗</div>
                  <h2 className="text-xl font-bold text-gray-800">輸入網址</h2>
                </div>
                
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/lesson.json"
                  className="input-field mb-4"
                  onKeyPress={(e) => e.key === 'Enter' && handleURLSubmit()}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={handleURLSubmit}
                    className="flex-1 btn-large btn-primary"
                  >
                    載入
                  </button>
                  <button
                    onClick={() => {
                      setShowURLInput(false)
                      setUrl('')
                    }}
                    className="flex-1 btn-large btn-secondary"
                  >
                    取消
                  </button>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ 注意：如果網址不支援 CORS，可能無法載入。<br />
                    建議：下載 JSON 檔案後，使用「選擇檔案」功能。
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 說明 */}
        {!loading && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>支援載入含有段落、圖片和題目的 JSON 檔案</p>
            <p className="mt-1">建議檔案大小：20MB 以下</p>
          </div>
        )}
      </div>
    </div>
  )
}
