import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { formatVND } from '../utils/currency'
import { BRANDS } from '../utils/brands'

function FilterSidebar({ filters, onFilterChange, onClearFilters, brandsOptions = [] }) {
  const { t } = useLanguage()
  
  const categories = [
    { value: 'Gaming', label: { en: 'Gaming', vi: 'Gaming' } },
    { value: 'Business', label: { en: 'Business', vi: 'Doanh nghiệp' } },
    { value: 'Ultrabook', label: { en: 'Ultrabook', vi: 'Ultrabook' } },
    { value: 'Professional', label: { en: 'Professional', vi: 'Chuyên nghiệp' } },
    { value: '2-in-1', label: { en: '2-in-1', vi: '2-in-1' } }
  ]
  
  const priceRanges = [
    { id: 'lt5', label: { en: 'Under 5M VND', vi: 'Dưới 5 triệu' }, min: 0, max: 5000000 },
    { id: '5to10', label: { en: '5M - 10M VND', vi: '5 - 10 triệu' }, min: 5000000, max: 10000000 },
    { id: '10to15', label: { en: '10M - 15M VND', vi: '10 - 15 triệu' }, min: 10000000, max: 15000000 },
    { id: '15to20', label: { en: '15M - 20M VND', vi: '15 - 20 triệu' }, min: 15000000, max: 20000000 },
    { id: '20to25', label: { en: '20M - 25M VND', vi: '20 - 25 triệu' }, min: 20000000, max: 25000000 },
    { id: '25to30', label: { en: '25M - 30M VND', vi: '25 - 30 triệu' }, min: 25000000, max: 30000000 },
    { id: '30to40', label: { en: '30M - 40M VND', vi: '30 - 40 triệu' }, min: 30000000, max: 40000000 },
    { id: 'gt50', label: { en: 'Above 50M VND', vi: 'Trên 50 triệu' }, min: 50000000, max: null }
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
          {(brandsOptions.length ? brandsOptions : BRANDS).map((brand) => (
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
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Array.isArray(filters.priceRanges) && filters.priceRanges.includes(range.id)}
                onChange={() => onFilterChange('priceRangeToggle', range.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{t(range.label)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(FilterSidebar)
