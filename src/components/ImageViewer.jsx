export default function ImageViewer({ image, onPrevious, onNext, canGoPrev, canGoNext }) {
  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    // 點擊左半邊 = 上一段，右半邊 = 下一段
    if (x < width / 2) {
      if (canGoPrev) {
        onPrevious()
      }
    } else {
      if (canGoNext) {
        onNext()
      }
    }
  }

  return (
    <div className="relative group">
      {/* 圖片 */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer select-none"
        onClick={handleImageClick}
      >
        <img
          src={image}
          alt="段落插圖"
          className="w-full h-auto object-contain bg-white"
          draggable="false"
        />

        {/* 懸停提示 - 桌面版 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:flex">
          {/* 左半邊提示 */}
          <div className="w-1/2 bg-gradient-to-r from-black/20 to-transparent flex items-center justify-center">
            {canGoPrev && (
              <div className="bg-white/90 rounded-full p-4 shadow-lg">
                <svg className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            )}
          </div>

          {/* 右半邊提示 */}
          <div className="w-1/2 bg-gradient-to-l from-black/20 to-transparent flex items-center justify-center">
            {canGoNext && (
              <div className="bg-white/90 rounded-full p-4 shadow-lg">
                <svg className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 行動版提示 - 顯示在圖片下方 */}
      <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>點左側</span>
        </div>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>點右側</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
