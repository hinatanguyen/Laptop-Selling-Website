import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsAPI, reviewsAPI } from '../services/api'
import { useCartStore } from '../context/CartContext'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'
import { formatVND } from '../utils/currency'
import { ShoppingCartIcon, HeartIcon, ShareIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ProductDetail() {
  const { t } = useLanguage()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    loadProduct()
  }, [slug])

  const loadProduct = async () => {
    try {
      const { data } = await productsAPI.getBySlug(slug)
      setProduct(data)
      // Load related products after getting the main product
      loadRelatedProducts(data)
    } catch (error) {
      console.error('Failed to load product:', error)
      toast.error(t({ en: 'Product not found', vi: 'Không tìm thấy sản phẩm' }))
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedProducts = async (currentProduct) => {
    if (!currentProduct) return
    
    setRelatedLoading(true)
    try {
      // Get products from the same category, excluding current product
      const { data } = await productsAPI.getAll({
        limit: 20, // Get more to filter out current product
        categories: currentProduct.category
      })
      
      let relatedItems = (data.products || data || []).filter(p => p.id !== currentProduct.id)
      
      // If we don't have enough from same category, get from same brand
      if (relatedItems.length < 4) {
        try {
          const { data: brandData } = await productsAPI.getAll({
            limit: 20,
            brands: currentProduct.brand
          })
          
          // Add brand products that aren't already included and aren't the current product
          const brandItems = (brandData.products || brandData || [])
            .filter(p => p.id !== currentProduct.id && !relatedItems.find(r => r.id === p.id))
          
          relatedItems = [...relatedItems, ...brandItems]
        } catch (brandError) {
          console.error('Failed to load brand products:', brandError)
        }
      }
      
      // If still not enough, get any products
      if (relatedItems.length < 4) {
        try {
          const { data: allData } = await productsAPI.getAll({ limit: 20 })
          const allItems = (allData.products || allData || [])
            .filter(p => p.id !== currentProduct.id && !relatedItems.find(r => r.id === p.id))
          
          relatedItems = [...relatedItems, ...allItems]
        } catch (allError) {
          console.error('Failed to load all products:', allError)
        }
      }
      
      // Take only the first 4 products
      setRelatedProducts(relatedItems.slice(0, 4))
      
    } catch (error) {
      console.error('Failed to load related products:', error)
      setRelatedProducts([])
    } finally {
      setRelatedLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success(t({ 
      en: `${quantity} ${product.name} added to cart!`,
      vi: `Đã thêm ${quantity} ${product.name} vào giỏ hàng!`
    }))
  }

  // Function to translate specification keys
  const translateSpecKey = (key) => {
    const specTranslations = {
      'ram': t({ en: 'Ram', vi: 'Ram' }),
      'screen': t({ en: 'Screen', vi: 'Màn Hình' }),
      'display': t({ en: 'Screen', vi: 'Màn Hình' }),
      'weight': t({ en: 'Weight', vi: 'Khối Lượng' }),
      'battery': t({ en: 'Battery', vi: 'Pin' }),
      'storage': t({ en: 'Storage', vi: 'Dung Lượng' }),
      'graphics': t({ en: 'Graphics', vi: 'Card Đồ Họa' }),
      'processor': t({ en: 'Processor', vi: 'Bộ Xử Lý' }),
      'dimensions': t({ en: 'Dimensions', vi: 'Kích Thước' }),
      'operatingsystem': t({ en: 'Operating System', vi: 'Hệ Điều Hành' }),
      'ports': t({ en: 'Ports', vi: 'Cổng Kết Nối' }),
      'wireless': t({ en: 'Wireless', vi: 'Kết Nối Không Dây' })
    }
    
    const normalizedKey = key.toLowerCase().replace(/[_\s]+/g, '').trim()
    return specTranslations[normalizedKey] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) return <Loading />
  if (!product) return null

  // Get images array (support both old and new format)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url] 
      : ['https://via.placeholder.com/800x600?text=No+Image']

  // Normalize specs into a consistent object for the modal table
  const normalizedSpecs = (() => {
    const normalizeKey = (k) => k?.toString().toLowerCase().replace(/[_\s]+/g, '').trim()
    const mapCanonical = (norm) => {
      if (norm === 'screen' || norm === 'display') return 'display'
      if (norm === 'operatingsystem') return 'operatingSystem'
      return norm
    }

    let specsObj = {}
    if (product.specs && typeof product.specs === 'object') {
      Object.entries(product.specs).forEach(([k, v]) => {
        const canon = mapCanonical(normalizeKey(k))
        specsObj[canon] = v
      })
    } else if (product.specs && typeof product.specs === 'string') {
      product.specs.split(',').forEach((pair) => {
        const [k, v] = pair.split(':')
        if (k) {
          const canon = mapCanonical(normalizeKey(k))
          specsObj[canon] = (v || '').trim()
        }
      })
    }
    return specsObj
  })()

  const SPEC_ORDER = ['ram','storage','display','graphics','battery','weight','dimensions','operatingSystem','ports','wireless']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>{t({ en: 'Home', vi: 'Trang Chủ' })}</span> &gt; 
        <span className="hover:underline cursor-pointer ml-1" onClick={() => navigate('/products')}>{t({ en: 'Products', vi: 'Sản Phẩm' })}</span> &gt; 
        <span className="font-semibold ml-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div>
          {/* Main Image (fixed aspect ratio) */}
          <div className="card overflow-hidden mb-4 aspect-[4/3] bg-gray-50 flex items-center justify-center">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => { setIsLightboxOpen(true); setLightboxIndex(selectedImageIndex) }}
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {productImages.map((img, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`card overflow-hidden cursor-pointer transition aspect-square ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary-600'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category} • {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-600">({t({ en: '127 reviews', vi: '127 đánh giá' })})</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <HeartIcon className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {formatVND(product.price)}
            </div>
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                  {product.stock > 10 ? t({ en: 'In Stock', vi: 'Còn Hàng' }) : t({ en: `Only ${product.stock} left`, vi: `Chỉ còn ${product.stock}` })}
                </span>
              </div>
            ) : (
              <span className="badge badge-danger">{t({ en: 'Out of Stock', vi: 'Hết Hàng' })}</span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">{t({ en: 'Description', vi: 'Mô Tả' })}</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">{t({ en: 'Specifications', vi: 'Thông Số Kỹ Thuật' })}</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {/* Primary specs list */}
              <div className="flex justify-between">
                <span className="text-gray-600">{t({ en: 'Processor', vi: 'Bộ Xử Lý' })}</span>
                <span className="font-semibold text-right">{product.processor}</span>
              </div>
              {product.specs && typeof product.specs === 'object' ? (
                Object.entries(product.specs)
                  .filter(([key, value]) => value && String(value).trim() !== '')
                  .filter(([key]) => ['ram','storage','display','screen','graphics','weight','battery'].includes(key.toLowerCase()))
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{translateSpecKey(key)}</span>
                      <span className="font-semibold text-right">{value}</span>
                    </div>
                  ))
              ) : product.specs && typeof product.specs === 'string' ? (
                product.specs.split(',').map((spec, i) => {
                  const [key, value] = spec.trim().split(':')
                  return (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-600">{translateSpecKey(key)}</span>
                      <span className="font-semibold text-right">{value || spec}</span>
                    </div>
                  )
                })
              ) : null}

              {/* Bottom toggle opens modal */}
              {product.specs && (
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setIsSpecModalOpen(true)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                  >
                    {t({ en: 'Show Detail Spec', vi: 'Xem Chi Tiết' })}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Specs Modal */}
          {isSpecModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={() => setIsSpecModalOpen(false)}>
              <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{t({ en: 'Detailed Specifications', vi: 'Chi Tiết Thông Số' })}</h3>
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsSpecModalOpen(false)} aria-label="Close">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left text-gray-700 font-medium px-4 py-2 w-1/2">{t({ en: 'Specification', vi: 'Thông Số' })}</th>
                        <th className="text-right text-gray-700 font-medium px-4 py-2 w-1/2">{t({ en: 'Detail', vi: 'Chi Tiết' })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-white even:bg-gray-50 border-t">
                        <td className="text-gray-600 px-4 py-2">{t({ en: 'Processor', vi: 'Bộ Xử Lý' })}</td>
                        <td className="font-semibold text-right px-4 py-2">{product.processor}</td>
                      </tr>
                      {SPEC_ORDER.map((key) => (
                        <tr key={key} className="odd:bg-white even:bg-gray-50 border-t">
                          <td className="text-gray-600 px-4 py-2">{translateSpecKey(key)}</td>
                          <td className="font-semibold text-right px-4 py-2">{normalizedSpecs[key] && String(normalizedSpecs[key]).trim() !== '' ? normalizedSpecs[key] : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Image Lightbox */}
          {isLightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center select-none"
              onClick={() => setIsLightboxOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsLightboxOpen(false)
                if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % productImages.length)
                if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + productImages.length) % productImages.length)
              }}
              tabIndex={-1}
            >
              <button
                className="absolute top-6 right-6 text-white/80 hover:text-white"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <button
                className="absolute left-4 md:left-8 text-white/80 hover:text-white text-3xl"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + productImages.length) % productImages.length) }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <img
                src={productImages[lightboxIndex]}
                alt={`${product.name} large`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute right-4 md:right-8 text-white/80 hover:text-white text-3xl"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % productImages.length) }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="px-6 py-3 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-3 hover:bg-gray-100 transition"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {t({ en: 'Add to Cart', vi: 'Thêm Vào Giỏ' })}
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span>🚚</span>
              <span>{t({ en: `Free shipping on orders over ${formatVND(500)}`, vi: `Miễn phí vận chuyển cho đơn hàng trên ${formatVND(500)}` })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>↩️</span>
              <span>{t({ en: '30-day return policy', vi: 'Chính sách đổi trả trong 30 ngày' })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>🛡️</span>
              <span>{t({ en: '1-year warranty included', vi: 'Bao gồm bảo hành 1 năm' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">{t({ en: 'You Might Also Like', vi: 'Có Thể Bạn Cũng Thích' })}</h2>
          
          {relatedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="bg-gray-300 aspect-[4/3] rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}
