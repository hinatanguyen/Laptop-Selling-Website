import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import Loading from '../components/Loading'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 30
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand')] : [],
    maxPrice: 5000,
    search: searchParams.get('search') || ''
  })
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    loadProducts()
  }, [filters, sortBy, currentPage])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data } = await productsAPI.getAll({
        categories: filters.categories.join(','),
        brands: filters.brands.join(','),
        maxPrice: filters.maxPrice,
        search: filters.search,
        sortBy,
        page: currentPage,
        limit: limit
      })
      setProducts(data.products || [])
      if (data.pagination) {
        setTotalProducts(data.pagination.total)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'category') {
        const categories = prev.categories.includes(value)
          ? prev.categories.filter(c => c !== value)
          : [...prev.categories, value]
        return { ...prev, categories }
      }
      if (type === 'brand') {
        const brands = prev.brands.includes(value)
          ? prev.brands.filter(b => b !== value)
          : [...prev.brands, value]
        return { ...prev, brands }
      }
      if (type === 'maxPrice') {
        return { ...prev, maxPrice: value }
      }
      return prev
    })
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      maxPrice: 5000,
      search: ''
    })
    setSearchParams({})
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600">
        <span>Home</span> &gt; <span className="font-semibold">Products</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{products.length}</span> of <span className="font-semibold">{totalProducts}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="px-2">...</span>
                    }
                    return null
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
