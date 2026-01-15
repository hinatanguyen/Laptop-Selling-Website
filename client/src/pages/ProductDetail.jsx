import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsAPI } from '../services/api'
import { useCartStore } from '../context/CartContext'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'
import { ShoppingCartIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const { data } = await productsAPI.getById(id)
      setProduct(data)
    } catch (error) {
      console.error('Failed to load product:', error)
      toast.error('Product not found')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success(`${quantity} ${product.name} added to cart!`)
  }

  if (loading) return <Loading />
  if (!product) return null

  // Get images array (support both old and new format)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url] 
      : ['https://via.placeholder.com/800x600?text=No+Image']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span> &gt; 
        <span className="hover:underline cursor-pointer ml-1" onClick={() => navigate('/products')}>Products</span> &gt; 
        <span className="font-semibold ml-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="card overflow-hidden mb-4">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`card overflow-hidden cursor-pointer transition ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary-600'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-auto" />
                </div>
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
                <span className="text-sm text-gray-600">(127 reviews)</span>
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
              ${parseFloat(product.price || 0).toFixed(2)}
            </div>
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                </span>
              </div>
            ) : (
              <span className="badge badge-danger">Out of Stock</span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Processor</span>
                <span className="font-semibold">{product.processor}</span>
              </div>
              {product.specs && typeof product.specs === 'object' ? (
                // Handle specs as object (JSONB from database)
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))
              ) : product.specs && typeof product.specs === 'string' ? (
                // Handle specs as comma-separated string
                product.specs.split(',').map((spec, i) => {
                  const [key, value] = spec.trim().split(':')
                  return (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-semibold">{value || spec}</span>
                    </div>
                  )
                })
              ) : null}
            </div>
          </div>

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
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span>🚚</span>
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>↩️</span>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>🛡️</span>
              <span>1-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (optional) */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        {/* Add related products here */}
      </div>
    </div>
  )
}
