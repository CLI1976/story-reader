import ClozeQuestion from './ClozeQuestion'
import ChoiceQuestion from './ChoiceQuestion'

export default function QuizSection({ quiz, paragraphIndex, answers, showResults, onAnswer }) {
  // 檢查是否有題目
  const hasCloze = quiz.cloze && quiz.cloze.length > 0
  const hasChoices = quiz.choices && quiz.choices.length > 0

  if (!hasCloze && !hasChoices) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">✏️</span>
        <h2 className="text-xl font-bold text-gray-800">文意理解練習</h2>
      </div>

      <div className="space-y-8">
        {/* 填空題 */}
        {hasCloze && quiz.cloze.map((question, index) => (
          <ClozeQuestion
            key={`cloze-${paragraphIndex}-${index}`}
            question={question}
            questionId={`cloze-${paragraphIndex}-${index}`}
            index={index}
            answer={answers[`cloze-${paragraphIndex}-${index}`]}
            showResult={showResults[`cloze-${paragraphIndex}-${index}`]}
            onAnswer={onAnswer}
          />
        ))}

        {/* 選擇題 */}
        {hasChoices && quiz.choices.map((question, index) => (
          <ChoiceQuestion
            key={`choice-${paragraphIndex}-${index}`}
            question={question}
            questionId={`choice-${paragraphIndex}-${index}`}
            index={index + (hasCloze ? quiz.cloze.length : 0)}
            answer={answers[`choice-${paragraphIndex}-${index}`]}
            showResult={showResults[`choice-${paragraphIndex}-${index}`]}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    </div>
  )
}
