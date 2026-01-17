import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'

function FilterSidebar({ filters, onFilterChange, onClearFilters }) {
  const { t } = useLanguage()
  
  const categories = [
    { value: 'Gaming', label: { en: 'Gaming', vi: 'Gaming' } },
    { value: 'Business', label: { en: 'Business', vi: 'Doanh nghiệp' } },
    { value: 'Ultrabook', label: { en: 'Ultrabook', vi: 'Ultrabook' } },
    { value: 'Professional', label: { en: 'Professional', vi: 'Chuyên nghiệp' } },
    { value: '2-in-1', label: { en: '2-in-1', vi: '2-in-1' } }
  ]
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">{t({ en: 'Filters', vi: 'Bộ Lọc' })}</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
        >
          {t({ en: 'Clear All', vi: 'Xóa Tất Cả' })}
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">{t({ en: 'Category', vi: 'Danh Mục' })}</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.value)}
                onChange={() => onFilterChange('category', cat.value)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{t(cat.label)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">{t({ en: 'Brand', vi: 'Thương Hiệu' })}</h4>
        <div className="space-y-2">
          {['Dell', 'Apple', 'Lenovo', 'HP', 'ASUS', 'Microsoft', 'Acer', 'Razer'].map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => onFilterChange('brand', brand)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">{t({ en: 'Price Range', vi: 'Khoảng Giá' })}</h4>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span className="font-semibold text-primary-600">${filters.maxPrice}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(FilterSidebar)
