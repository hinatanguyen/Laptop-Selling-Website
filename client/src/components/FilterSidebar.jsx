import { memo } from 'react'

function FilterSidebar({ filters, onFilterChange, onClearFilters }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {['Gaming', 'Business', 'Ultrabook', 'Workstation', 'Professional'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => onFilterChange('category', cat)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Brand</h4>
        <div className="space-y-2">
          {['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI'].map((brand) => (
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
        <h4 className="font-semibold mb-3">Price Range</h4>
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
