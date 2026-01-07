import { useState, useEffect } from 'react'
import LoadPage from './components/LoadPage'
import ReaderPage from './components/ReaderPage'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 重置應用程式
  const handleReset = () => {
    if (confirm('確定要重新載入檔案嗎？目前進度將會遺失。')) {
      setJsonData(null)
      setError('')
    }
  }

  // 處理檔案上傳
  const handleFileUpload = async (file) => {
    // 檢查檔案類型
    if (!file.name.endsWith('.json')) {
      setError('請選擇 JSON 檔案')
      return
    }

    // 檢查檔案大小
    const sizeMB = (file.size / 1024 / 1024).toFixed(1)
    console.log(`檔案大小：${sizeMB} MB`)

    if (file.size > 50 * 1024 * 1024) {
      if (!confirm(`檔案較大（${sizeMB} MB），載入可能需要 10-20 秒。\n確定要繼續嗎？`)) {
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      // 讀取檔案
      const text = await file.text()
      
      // 解析 JSON
      let data = JSON.parse(text)
      
      // 【格式轉換】支援完整版應用程式匯出的格式
      console.log('[載入] 偵測 JSON 格式...', {
        hasAnalyzedData: !!data.analyzedData,
        hasParagraphs: !!data.paragraphs,
        hasResults: !!data.results,
        hasParagraphImages: !!data.paragraphImages
      })
      
      // 格式 1：完整版匯出格式（from 完整版 App.jsx）
      if (data.paragraphs && Array.isArray(data.paragraphs) && typeof data.paragraphs[0] === 'string') {
        console.log('✓ 偵測到完整版格式，開始轉換...')
        
        // 完整版格式：
        // paragraphs: ["段落1文字", "段落2文字", ...]
        // paragraphSummaries: ["摘要1", "摘要2", ...]
        // results: [{ cloze: [...], choices: [...] }, ...]
        // paragraphImages: { "0": "base64...", "1": "base64..." }
        
        const convertedParagraphs = data.paragraphs.map((text, index) => {
          // 取得對應的圖片、摘要和題目
          const image = data.paragraphImages?.[index] || ''
          const summary = data.paragraphSummaries?.[index] || ''
          const result = data.results?.[index] || {}
          
          // 除錯：顯示每個段落的題目數量
          console.log(`[段落 ${index + 1}] 題目數量:`, {
            填空題: result.cloze?.length || 0,
            選擇題: result.choices?.length || 0
          })
          
          return {
            index: index,
            text: text,
            image: image,
            summary: summary,
            quiz: {
              cloze: result.cloze || [],
              choices: result.choices || []
            }
          }
        })
        
        data = {
          title: data.articleTitle || data.name || '未命名課文',
          paragraphs: convertedParagraphs
        }
        
        console.log('✓ 格式轉換完成！', {
          標題: data.title,
          段落數: data.paragraphs.length,
          有圖片的段落: data.paragraphs.filter(p => p.image).length,
          有題目的段落: data.paragraphs.filter(p => p.quiz.cloze.length > 0 || p.quiz.choices.length > 0).length
        })
        
        // 除錯：顯示完整的資料結構（前兩個段落）
        console.log('[除錯] 前兩個段落的完整資料:', 
          data.paragraphs.slice(0, 2).map(p => ({
            文字長度: p.text?.length || 0,
            有圖片: !!p.image,
            有摘要: !!p.summary,
            填空題數: p.quiz?.cloze?.length || 0,
            選擇題數: p.quiz?.choices?.length || 0,
            填空題內容: p.quiz?.cloze || [],
            選擇題內容: p.quiz?.choices || []
          }))
        )
      }
      // 格式 2：舊版格式（如果有 analyzedData）
      else if (data.analyzedData && data.analyzedData.paragraphs) {
        console.log('✓ 偵測到舊版格式，開始轉換...')
        
        const convertedParagraphs = data.analyzedData.paragraphs.map(p => ({
          index: p.index,
          text: p.text || p.paragraphText || '',
          image: p.imageData || p.image || '',
          summary: p.summary || '',
          quiz: {
            cloze: p.clozeQuestions || p.quiz?.cloze || [],
            choices: p.multipleChoiceQuestions || p.quiz?.choices || []
          }
        }))
        
        data = {
          title: data.analyzedData.title || data.name || '未命名課文',
          paragraphs: convertedParagraphs
        }
      }
      // 格式 3：已經是簡化版格式
      else if (data.paragraphs && Array.isArray(data.paragraphs) && typeof data.paragraphs[0] === 'object') {
        console.log('✓ 已經是簡化版格式，直接使用')
      }
      
      // 驗證資料格式
      if (!data.paragraphs || !Array.isArray(data.paragraphs)) {
        throw new Error('檔案格式不正確：缺少 paragraphs 陣列')
      }

      if (data.paragraphs.length === 0) {
        throw new Error('檔案中沒有段落資料')
      }

      console.log('✓ JSON 載入成功！', {
        標題: data.title,
        段落數: data.paragraphs.length,
        第一段有圖片: !!data.paragraphs[0]?.image
      })

      setJsonData(data)
    } catch (error) {
      console.error('載入失敗:', error)
      setError('檔案載入失敗：' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // 處理 URL 載入
  const handleURLLoad = async (url) => {
    if (!url.trim()) {
      setError('請輸入網址')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('正在載入:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 無法載入檔案`)
      }

      let data = await response.json()

      // 【格式轉換】支援完整版應用程式匯出的格式
      if (data.analyzedData && data.analyzedData.paragraphs) {
        console.log('✓ 偵測到完整版格式，自動轉換...')
        
        // 轉換段落格式
        const convertedParagraphs = data.analyzedData.paragraphs.map(p => ({
          index: p.index,
          text: p.text || p.paragraphText || '',
          image: p.imageData || p.image || '',
          summary: p.summary || '',
          quiz: {
            cloze: p.clozeQuestions || p.quiz?.cloze || [],
            choices: p.multipleChoiceQuestions || p.quiz?.choices || []
          }
        }))
        
        data = {
          title: data.analyzedData.title || data.name || '未命名課文',
          paragraphs: convertedParagraphs
        }
      }

      // 驗證資料格式
      if (!data.paragraphs || !Array.isArray(data.paragraphs)) {
        throw new Error('檔案格式不正確：缺少 paragraphs 陣列')
      }

      if (data.paragraphs.length === 0) {
        throw new Error('檔案中沒有段落資料')
      }

      console.log('✓ JSON 載入成功！', {
        標題: data.title,
        段落數: data.paragraphs.length,
        第一段有圖片: !!data.paragraphs[0]?.image
      })

      setJsonData(data)
    } catch (error) {
      console.error('載入失敗:', error)
      
      let errorMessage = error.message
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'CORS 錯誤：無法直接載入此網址的檔案。\n' +
                      '建議：請下載 JSON 檔案後，使用「選擇檔案」功能上傳。'
      }
      
      setError('載入失敗：' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {!jsonData ? (
        <LoadPage 
          onFileUpload={handleFileUpload}
          onURLLoad={handleURLLoad}
          loading={loading}
          error={error}
        />
      ) : (
        <ReaderPage 
          data={jsonData}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
