export default function TextContent({ text, summary }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📖</span>
        <h2 className="text-xl font-bold text-gray-800">課文內容</h2>
      </div>

      {/* 課文文字 */}
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
          {text}
        </p>
      </div>

      {/* 段落摘要（如果有） */}
      {summary && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-primary rounded-r-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <h3 className="font-semibold text-gray-800">段落摘要</h3>
          </div>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  )
}
