import { useState, useEffect } from 'react'
import ImageViewer from './ImageViewer'
import TextContent from './TextContent'
import QuizSection from './QuizSection'
import Navigation from './Navigation'

export default function ReaderPage({ data, onReset }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState({})

  const totalParagraphs = data.paragraphs.length
  const currentParagraph = data.paragraphs[currentIndex]

  // 鍵盤導航
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToPrevious()
      } else if (e.key === 'ArrowRight' && currentIndex < totalParagraphs - 1) {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, totalParagraphs])

  // 導航函數
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToNext = () => {
    if (currentIndex < totalParagraphs - 1) {
      setCurrentIndex(currentIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 記錄答案
  const handleAnswer = (questionId, answer, isCorrect) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }))
    setShowResults(prev => ({
      ...prev,
      [questionId]: true
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頁首 */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {data.title || '故事圖畫閱讀器'}
              </h1>
              <span className="px-3 py-1 bg-primary/10 text-primary font-semibold rounded-lg">
                {currentIndex + 1} / {totalParagraphs}
              </span>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
            >
              🔄 重新載入
            </button>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左側：圖片 */}
          <div className="lg:sticky lg:top-24 h-fit">
            {currentParagraph.image ? (
              <ImageViewer
                image={currentParagraph.image}
                onPrevious={goToPrevious}
                onNext={goToNext}
                canGoPrev={currentIndex > 0}
                canGoNext={currentIndex < totalParagraphs - 1}
              />
            ) : (
              <div className="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center text-gray-500">
                <span className="text-4xl">🖼️</span>
                <span className="ml-2 text-lg">沒有圖片</span>
              </div>
            )}
          </div>

          {/* 右側：內容和題目 */}
          <div className="space-y-6">
            {/* 課文內容 */}
            <TextContent 
              text={currentParagraph.text}
              summary={currentParagraph.summary}
            />

            {/* 題目區域 */}
            {currentParagraph.quiz && (
              <QuizSection
                quiz={currentParagraph.quiz}
                paragraphIndex={currentIndex}
                answers={answers}
                showResults={showResults}
                onAnswer={handleAnswer}
              />
            )}
          </div>
        </div>

        {/* 導航按鈕 */}
        <Navigation
          currentIndex={currentIndex}
          totalParagraphs={totalParagraphs}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </main>

      {/* 頁尾提示 */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>💡 提示：可以使用鍵盤 ← → 鍵或點擊圖片左右兩側來翻頁</p>
        </div>
      </footer>
    </div>
  )
}
