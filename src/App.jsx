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
        // paragraphSummaries: { "0": [...], "1": [...] } 或 ["摘要1", "摘要2", ...]
        // results: [{ id, question, options, correct_answer, related_paragraph_index }, ...]
        // paragraphImages: { "0": "base64...", "1": "base64..." }
        
        // 【重要】完整版的 results 格式說明：
        // - results 是扁平陣列，所有題目在一起
        // - 每個題目有 related_paragraph_index (1-based) 指向段落
        // - correct_answer 是 1-based (1, 2, 3, 4)
        // - 需要轉換成 0-based 的 correctIndex (0, 1, 2, 3)
        
        // 步驟 1：按段落分組題目
        const questionsByParagraph = {}
        
        if (data.results && Array.isArray(data.results)) {
          data.results.forEach(q => {
            // related_paragraph_index 是 1-based，轉換成 0-based
            const paraIndex = (q.related_paragraph_index || 1) - 1
            
            if (!questionsByParagraph[paraIndex]) {
              questionsByParagraph[paraIndex] = []
            }
            
            // 轉換成簡化版格式
            questionsByParagraph[paraIndex].push({
              question: q.question,
              options: q.options || [],
              correctIndex: (q.correct_answer || 1) - 1  // 1-based → 0-based
            })
          })
          
          console.log('[題目分組] 每個段落的題目數量:', 
            Object.entries(questionsByParagraph).map(([idx, qs]) => `段落${parseInt(idx)+1}: ${qs.length}題`)
          )
        }
        
        // 步驟 2：轉換段落
        const convertedParagraphs = data.paragraphs.map((text, index) => {
          // 取得對應的圖片
          const image = data.paragraphImages?.[index] || data.paragraphImages?.[index.toString()] || ''
          
          // 取得對應的摘要（支援兩種格式）
          let summary = ''
          if (data.paragraphSummaries) {
            if (Array.isArray(data.paragraphSummaries)) {
              summary = data.paragraphSummaries[index] || ''
            } else if (typeof data.paragraphSummaries === 'object') {
              const summaryArray = data.paragraphSummaries[index] || data.paragraphSummaries[index.toString()]
              summary = Array.isArray(summaryArray) ? summaryArray.join('\n') : (summaryArray || '')
            }
          }
          
          // 取得對應的題目
          const questions = questionsByParagraph[index] || []
          
          // 除錯：顯示每個段落的題目數量
          console.log(`[段落 ${index + 1}]`, {
            文字長度: text?.length || 0,
            有圖片: !!image,
            有摘要: !!summary,
            題目數: questions.length
          })
          
          return {
            index: index,
            text: text,
            image: image,
            summary: summary,
            quiz: {
              cloze: [],  // 完整版目前沒有填空題
              choices: questions  // 所有題目都是選擇題
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
          有題目的段落: data.paragraphs.filter(p => p.quiz.choices.length > 0).length,
          總題目數: data.paragraphs.reduce((sum, p) => sum + p.quiz.choices.length, 0)
        })
        
        // 除錯：顯示前兩個段落的完整資料
        if (data.paragraphs.length > 0) {
          console.log('[除錯] 第一個段落的題目:', 
            data.paragraphs[0].quiz.choices.slice(0, 2).map(q => ({
              題目: q.question,
              選項數: q.options.length,
              正確答案索引: q.correctIndex
            }))
          )
        }
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
