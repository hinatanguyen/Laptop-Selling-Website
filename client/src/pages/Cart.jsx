import { Link } from 'react-router-dom'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { formatVND } from '../utils/currency'

export default function Cart() {
  const { t } = useLanguage()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBagIcon className="mx-auto h-24 w-24 text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{t({ en: 'Your cart is empty', vi: 'Giỏ hàng của bạn trống' })}</h2>
          <p className="mt-2 text-gray-600">{t({ en: 'Start shopping to add items to your cart', vi: 'Bắt đầu mua sắm để thêm sản phẩm vào giỏ hàng' })}</p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            {t({ en: 'Continue Shopping', vi: 'Tiếp Tục Mua Sắm' })}
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t({ en: 'Shopping Cart', vi: 'Giỏ Hàng' })}</h1>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to clear your cart?')) {
              clearCart()
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6"
            >
              <img
                src={item.images && item.images.length > 0
                  ? item.images[0]
                  : item.image_url || item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{item.brand}</p>
                <p className="text-primary-600 font-bold mt-2">{formatVND(item.price)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 rounded hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                  className="p-1 rounded hover:bg-gray-100"
                  disabled={item.quantity >= item.stock}
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatVND(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <TrashIcon className="h-4 w-4" />
                  {t({ en: 'Remove', vi: 'Xóa' })}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t({ en: 'Order Summary', vi: 'Tóm Tắt Đơn Hàng' })}</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-gray-600">
                <span>{t({ en: 'Subtotal', vi: 'Tạm Tính' })}</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t({ en: 'Shipping', vi: 'Phí Vận Chuyển' })}</span>
                <span className="text-green-600 font-semibold">{t({ en: 'Free', vi: 'Miễn Phí' })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t({ en: 'Tax (10%)', vi: 'Thuế (10%)' })}</span>
                <span>{formatVND(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
              <span>{t({ en: 'Total', vi: 'Tổng Cộng' })}</span>
              <span>{formatVND(total)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              {t({ en: 'Proceed to Checkout', vi: 'Tiến Hành Thanh Toán' })}
            </Link>

            <Link
              to="/products"
              className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition text-center block"
            >
              {t({ en: 'Continue Shopping', vi: 'Tiếp Tục Mua Sắm' })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
