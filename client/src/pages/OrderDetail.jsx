import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ordersAPI, adminAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import { CheckCircleIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'

const statusSteps = {
  pending: 1,
  processing: 2,
  shipped: 3,
  delivered: 4
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [id])

  const loadOrder = async () => {
    try {
      // Use admin API if user is admin, otherwise use regular orders API
      const response = isAdmin ? 
        await adminAPI.getOrderById(id) : 
        await ordersAPI.getById(id)
      setOrder(response.data)
    } catch (error) {
      toast.error('Failed to load order')
      navigate('/orders')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return

    try {
      await ordersAPI.cancelOrder(id)
      toast.success('Order cancelled successfully')
      loadOrder()
    } catch (error) {
      toast.error('Failed to cancel order')
    }
  }

  if (loading) return <Loading />
  if (!order) return null

  const currentStep = statusSteps[order.status] || 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(isAdmin ? '/admin/orders' : '/orders')}
          className="text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Orders
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-gray-600 mt-1">
              Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Order Progress */}
      {order.status !== 'cancelled' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
          <div className="relative">
            <div className="flex justify-between">
              {/* Pending */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <ClockIcon className="w-6 h-6" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Pending</p>
              </div>

              {/* Processing */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Processing</p>
              </div>

              {/* Shipped */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <TruckIcon className="w-6 h-6" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Shipped</p>
              </div>

              {/* Delivered */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= 4 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Delivered</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
              <img
                src={item.product_image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEMyOC45NTQzIDI0IDIwIDMyLjk1NDMgMjAgNDRDMjAgNTUuMDQ1NyAyOC45NTQzIDY0IDQwIDY0QzUxLjA0NTcgNjQgNjAgNTUuMDQ1NyA2MCA0NEM2MCAzMi45NTQzIDUxLjA0NTcgMjQgNDAgMjRaTTQwIDI3QzQ5LjM4ODkgMjcgNTcgMzQuNjExMSA1NyA0NEM1NyA0OS4wNzI5IDU0LjUwNzEgNTMuNTgzMyA1MC41IDU2LjM3NUw0My42ODc1IDQ5LjU2MjVDNDUuNzE5NyA0Ny41MzAzIDQ1LjcxOTcgNDQuMjE5NyA0My42ODc1IDQyLjE4NzVMMzYuMzEyNSAzNC44MTI1QzM0LjI4MDMgMzIuNzgwMyAzMC45Njk3IDMyLjc4MDMgMjguOTM3NSAzNC44MTI1TDIzLjYyNSA0MC4xMjVDMjMuMjE0MyAzOC4xNzE0IDIzIDM2LjExNDMgMjMgNDRDMjMgMzQuNjExMSAzMC42MTExIDI3IDQwIDI3WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded bg-gray-100"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center hidden">
                <span className="text-gray-400 text-xs text-center">No Image</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.product_name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ${parseFloat(item.price).toFixed(2)}</p>
              </div>
              <p className="font-bold text-gray-900">
                ${parseFloat(item.subtotal).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Information</h2>
        <div className="space-y-2 text-gray-600">
          {/* Customer Information */}
          <div className="space-y-1 mb-4">
            <p className="font-medium text-gray-900">Customer Details:</p>
            <p><span className="font-medium">Name:</span> {order.full_name || order.customer_name || 'N/A'}</p>
            <p><span className="font-medium">Email:</span> {order.email || order.customer_email || 'N/A'}</p>
            {(order.phone || order.customer_phone) && (
              <p><span className="font-medium">Phone:</span> {order.phone || order.customer_phone}</p>
            )}
          </div>

          {/* Delivery Address */}
          {(() => {
            try {
              const address = typeof order.shipping_address === 'string' 
                ? JSON.parse(order.shipping_address) 
                : order.shipping_address;
              
              return (
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Delivery Address:</p>
                  <p>{address.address}</p>
                  <p>{address.city}, {address.postal_code}</p>
                  <p>{address.country}</p>
                </div>
              );
            } catch (e) {
              return <p>{order.shipping_address}</p>;
            }
          })()}
          <div className="pt-3 mt-3 border-t border-gray-200">
            <p className="font-medium text-gray-900">Payment Method: 
              <span className="text-gray-600 font-normal">
                {order.payment_method === 'cash_on_delivery' ? 'Cash on Delivery' : order.payment_method}
              </span>
            </p>
            {order.tracking_number && (
              <p className="font-medium text-gray-900">Tracking Number: 
                <span className="text-gray-600 font-normal">{order.tracking_number}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {order.status === 'pending' && (
        <div className="mt-6">
          <button
            onClick={handleCancelOrder}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  )
}
