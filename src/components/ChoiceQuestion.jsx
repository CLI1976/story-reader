import { useState } from 'react'

export default function ChoiceQuestion({ question, questionId, index, answer, showResult, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) {
      alert('請選擇一個答案')
      return
    }

    const isCorrect = selected === question.correctIndex

    setSubmitted(true)
    onAnswer(questionId, selected, isCorrect)
  }

  const handleReset = () => {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl p-6">
      {/* 題號 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center justify-center w-8 h-8 bg-primary text-white font-bold rounded-full">
          {index + 1}
        </span>
        <span className="text-sm font-semibold text-gray-600">選擇題</span>
      </div>

      {/* 題目 */}
      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
        {question.question}
      </p>

      {/* 選項 */}
      <div className="space-y-3 mb-4">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex
          const isCorrectAnswer = optionIndex === question.correctIndex
          const showCorrect = submitted && isCorrectAnswer
          const showIncorrect = submitted && isSelected && !isCorrectAnswer

          let buttonClass = 'option-btn'
          if (isSelected && !submitted) {
            buttonClass += ' selected'
          }
          if (showCorrect) {
            buttonClass += ' border-success bg-success/10'
          }
          if (showIncorrect) {
            buttonClass += ' border-error bg-error/10'
          }

          return (
            <button
              key={optionIndex}
              onClick={() => !submitted && setSelected(optionIndex)}
              disabled={submitted}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-semibold">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {showCorrect && <span className="text-success text-2xl">✓</span>}
                {showIncorrect && <span className="text-error text-2xl">✗</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* 按鈕 */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
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
            <div className="flex items-center gap-2">
              <span className="text-2xl">✗</span>
              <span>答錯了，正確答案是選項 {String.fromCharCode(65 + question.correctIndex)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
