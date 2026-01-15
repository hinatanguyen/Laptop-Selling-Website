import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { adminAPI, productsAPI } from '../../services/api'
import axios from 'axios'
import Loading from '../../components/Loading'
import { useLanguage } from '../../context/LanguageContext'
import { PencilIcon, TrashIcon, PlusIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function AdminProducts() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 30
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Laptop',
    processor: '',
    price: '',
    stock: '',
    images: [],
    description: '',
    featured: false
  })

  useEffect(() => {
    loadProducts()
  }, [currentPage, searchTerm])

  const loadProducts = async () => {
    try {
      const response = await adminAPI.getProducts({
        page: currentPage,
        limit: limit,
        search: searchTerm
      })
      setProducts(response.data.products || response.data || [])
      if (response.data.pagination) {
        setTotalProducts(response.data.pagination.total)
        setTotalPages(response.data.pagination.pages)
      }
    } catch (error) {
      toast.error(t({ en: 'Failed to load products', vi: 'Không thể tải sản phẩm' }))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Map frontend field names to backend field names
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        processor: formData.processor,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images, // Send as array
        image: formData.images[0], // First image for backward compatibility
        description: formData.description,
        featured: formData.featured
      }

      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, productData)
        toast.success('Product updated successfully')
      } else {
        await adminAPI.createProduct(productData)
        toast.success('Product created successfully')
      }
      setShowModal(false)
      resetForm()
      loadProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || t({ en: 'Failed to save product', vi: 'Không thể lưu sản phẩm' }))
    }
  }

  const handleImageUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadedUrls = []
      
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i]
        const formDataUpload = new FormData()
        formDataUpload.append('image', file)

        const token = localStorage.getItem('token')
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload/single`,
          formDataUpload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        )

        uploadedUrls.push(`http://localhost:5000${response.data.imageUrl}`)
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }))

      toast.success(`${uploadedUrls.length} ${t({ en: 'image(s) uploaded successfully', vi: 'ảnh đã được tải lên thành công' })}`)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t({ en: 'Failed to upload image', vi: 'Không thể tải lên ảnh' }))
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addImageUrl = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t({ en: 'Are you sure you want to delete this product?', vi: 'Bạn có chắc chắn muốn xóa sản phẩm này?' }))) return

    try {
      await adminAPI.deleteProduct(id)
      toast.success(t({ en: 'Product deleted successfully', vi: 'Xóa sản phẩm thành công' }))
      loadProducts()
    } catch (error) {
      console.error('Delete product error:', error)
      toast.error(error.response?.data?.message || t({ en: 'Failed to delete product', vi: 'Không thể xóa sản phẩm' }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category: 'Laptop',
      processor: '',
      price: '',
      stock: '',
      images: [],
      description: '',
      featured: false
    })
    setEditingProduct(null)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      processor: product.processor,
      price: product.price,
      stock: product.stock,
      images: product.images || (product.image_url ? [product.image_url] : []),
      description: product.description,
      featured: product.featured
    })
    setShowModal(true)
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t({ en: 'Manage Products', vi: 'Quản Lý Sản Phẩm' })}</h1>
          <p className="text-gray-600 mt-1">{t({ en: 'Total:', vi: 'Tổng cộng:' })} {totalProducts} {t({ en: 'products', vi: 'sản phẩm' })}</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          {t({ en: 'Add Product', vi: 'Thêm Sản Phẩm' })}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={t({ en: 'Search products...', vi: 'Tìm kiếm sản phẩm...' })}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t({ en: 'Previous', vi: 'Trước' })}
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
                  onClick={() => setCurrentPage(page)}
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
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t({ en: 'Next', vi: 'Tiếp' })}
          </button>
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? t({ en: 'Edit Product', vi: 'Chỉnh Sửa Sản Phẩm' }) : t({ en: 'Add New Product', vi: 'Thêm Sản Phẩm Mới' })}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Name *', vi: 'Tên *' })}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Brand *', vi: 'Thương Hiệu *' })}</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Category *', vi: 'Danh Mục *' })}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Accessories">{t({ en: 'Accessories', vi: 'Phụ Kiện' })}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Processor', vi: 'Bộ Xử Lý' })}</label>
                  <input
                    type="text"
                    value={formData.processor}
                    onChange={(e) => setFormData({...formData, processor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Price *', vi: 'Giá *' })}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Stock *', vi: 'Tồn Kho *' })}</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images (Max 5)
                </label>
                
                {/* Image Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl opacity-0 group-hover:opacity-100 transition"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Buttons */}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition">
                      <PhotoIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Upload Images'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploading || formData.images.length >= 5}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={addImageUrl}
                    disabled={formData.images.length >= 5}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    {t({ en: 'Add URL', vi: 'Thêm URL' })}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t({ en: 'You can upload your own photos or add image URLs', vi: 'Bạn có thể tải lên ảnh của riêng mình hoặc thêm URL ảnh' })} ({formData.images.length}/5)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Description', vi: 'Mô Tả' })}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{t({ en: 'Featured Product', vi: 'Sản Phẩm Nổi Bật' })}</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  {editingProduct ? t({ en: 'Update', vi: 'Cập Nhật' }) : t({ en: 'Create', vi: 'Tạo' })}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  {t({ en: 'Cancel', vi: 'Hủy' })}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
