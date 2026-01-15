import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 hover:bg-gray-100 rounded-full transition"
      title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
    >
      {language === 'en' ? (
        // US Flag 🇺🇸
        <div className="w-6 h-5 relative rounded-sm overflow-hidden border border-gray-300 shadow-sm">
          {/* Stripes */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#B22234]"></div>
          </div>
          {/* Blue canton */}
          <div className="absolute top-0 left-0 w-[40%] h-[54%] bg-[#3C3B6E]"></div>
        </div>
      ) : (
        // Vietnamese Flag 🇻🇳
        <div className="w-6 h-5 bg-[#DA251D] rounded-sm flex items-center justify-center border border-gray-300 shadow-sm">
          <svg className="w-3.5 h-3.5" viewBox="0 0 100 100" fill="none">
            <path 
              d="M50 10 L61.8 43.4 L97.6 43.4 L69.1 63.4 L80.9 96.9 L50 76.8 L19.1 96.9 L30.9 63.4 L2.4 43.4 L38.2 43.4 Z" 
              fill="#FFFF00"
            />
          </svg>
        </div>
      )}
    </button>
  )
}
