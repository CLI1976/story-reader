import { useState } from 'react'

export default function ClozeQuestion({ question, questionId, index, answer, showResult, onAnswer }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('請輸入答案')
      return
    }

    const correctAnswer = question.answer
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()

    setSubmitted(true)
    onAnswer(questionId, userAnswer, isCorrect)
  }

  const handleReset = () => {
    setUserAnswer('')
    setSubmitted(false)
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl p-6">
      {/* 題號 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-8 h-8 bg-primary text-white font-bold rounded-full">
          {index + 1}
        </span>
        <span className="text-sm font-semibold text-gray-600">填空題</span>
      </div>

      {/* 題目 */}
      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
        {question.question}
      </p>

      {/* 輸入框 */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="請輸入答案..."
        disabled={submitted}
        className="input-field mb-4"
        onKeyPress={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
      />

      {/* 按鈕 */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="btn-large btn-primary flex-1"
          >
            提交答案
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="btn-large btn-secondary flex-1"
          >
            重新作答
          </button>
        )}
      </div>

      {/* 結果顯示 */}
      {submitted && answer && (
        <div className={`answer-feedback ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
          {answer.isCorrect ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>答對了！太棒了！</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✗</span>
                <span>答錯了，再想想看</span>
              </div>
              <div className="mt-2 p-3 bg-white rounded-lg">
                <span className="text-gray-700 font-semibold">正確答案：</span>
                <span className="text-gray-900 ml-2">{question.answer}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
