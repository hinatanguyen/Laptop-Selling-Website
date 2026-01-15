import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import toast from 'react-hot-toast'

function ProductCard({ product }) {
  const { t } = useLanguage()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(t({ 
      en: `${product.name} added to cart!`,
      vi: `Đã thêm ${product.name} vào giỏ hàng!`
    }))
  }

  // Get first image from images array or fallback to image_url
  const productImage = product.images && product.images.length > 0
    ? product.images[0]
    : product.image_url || product.image || 'https://via.placeholder.com/400x300?text=No+Image'

  return (
    <Link 
      to={`/products/${product.id}`}
      className="card overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {t({ en: 'Featured', vi: 'Nổi Bật' })}
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              {t({ en: 'Out of Stock', vi: 'Hết Hàng' })}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category} • {product.brand}
        </p>
        
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description || product.processor || 'Laptop specifications'}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              ${parseFloat(product.price || 0).toFixed(2)}
            </p>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-orange-600 font-semibold">
                {t({ en: `Only ${product.stock} left!`, vi: `Chỉ còn ${product.stock}!` })}
              </p>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            {t({ en: 'Add', vi: 'Thêm' })}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
