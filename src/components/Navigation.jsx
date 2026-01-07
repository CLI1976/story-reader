export default function Navigation({ currentIndex, totalParagraphs, onPrevious, onNext }) {
  return (
    <div className="mt-12 py-8 border-t-2 border-gray-200">
      <div className="flex items-center justify-center gap-6">
        {/* 上一段按鈕 */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="btn-large btn-secondary group"
        >
          <div className="flex items-center gap-3">
            <svg 
              className="w-6 h-6 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">上一段</span>
          </div>
        </button>

        {/* 進度顯示 */}
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          <div className="text-2xl font-bold text-gray-800">
            {currentIndex + 1} / {totalParagraphs}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalParagraphs) * 100}%` }}
            />
          </div>
        </div>

        {/* 下一段按鈕 */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalParagraphs - 1}
          className="btn-large btn-primary group"
        >
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">下一段</span>
            <svg 
              className="w-6 h-6 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* 鍵盤提示 */}
      <div className="mt-6 text-center text-sm text-gray-500 hidden md:block">
        <p>💡 提示：可以使用鍵盤 ← → 鍵快速翻頁</p>
      </div>
    </div>
  )
}
