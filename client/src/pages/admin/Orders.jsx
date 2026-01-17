import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { adminAPI } from '../../services/api'
import Loading from '../../components/Loading'
import { useLanguage } from '../../context/LanguageContext'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function AdminOrders() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  const translateStatus = (status) => {
    const statusTranslations = {
      pending: t({ en: 'Pending', vi: 'Đang Chờ' }),
      processing: t({ en: 'Processing', vi: 'Đang Xử Lý' }),
      shipped: t({ en: 'Shipped', vi: 'Đã Gửi' }),
      delivered: t({ en: 'Delivered', vi: 'Đã Giao' }),
      cancelled: t({ en: 'Cancelled', vi: 'Đã Hủy' })
    }
    return statusTranslations[status] || status
  }

  useEffect(() => {
    loadOrders()
  }, [filterStatus])

  const loadOrders = async () => {
    try {
      const params = filterStatus !== 'all' ? { status: filterStatus } : {}
      const response = await adminAPI.getOrders(params)
      setOrders(response.data)
    } catch (error) {
      toast.error(t({ en: 'Failed to load orders', vi: 'Không thể tải đơn hàng' }))
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus)
      toast.success(t({ en: 'Order status updated', vi: 'Cập nhật trạng thái đơn hàng thành công' }))
      loadOrders()
    } catch (error) {
      toast.error(t({ en: 'Failed to update order status', vi: 'Không thể cập nhật trạng thái đơn hàng' }))
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">{t({ en: 'Back to Dashboard', vi: 'Về Bảng Điều Khiển' })}</span>
        </button>
        <div className="h-6 w-px bg-gray-300"></div>
        <h1 className="text-3xl font-bold text-gray-900">{t({ en: 'Manage Orders', vi: 'Quản Lý Đơn Hàng' })}</h1>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t({ en: 'Filter by Status', vi: 'Lọc Theo Trạng Thái' })}</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">{t({ en: 'All Orders', vi: 'Tất Cả Đơn Hàng' })}</option>
          <option value="pending">{t({ en: 'Pending', vi: 'Đang Chờ' })}</option>
          <option value="processing">{t({ en: 'Processing', vi: 'Đang Xử Lý' })}</option>
          <option value="shipped">{t({ en: 'Shipped', vi: 'Đã Gửi' })}</option>
          <option value="delivered">{t({ en: 'Delivered', vi: 'Đã Giao' })}</option>
          <option value="cancelled">{t({ en: 'Cancelled', vi: 'Đã Hủy' })}</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Order ID', vi: 'Mã Đơn Hàng' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Customer', vi: 'Khách Hàng' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Items', vi: 'Sản Phẩm' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Total', vi: 'Tổng Cộng' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Status', vi: 'Trạng Thái' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Date', vi: 'Ngày' })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t({ en: 'Actions', vi: 'Hành Động' })}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link 
                    to={`/admin/orders/${order.id}`} 
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.full_name}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.customer_type === 'Guest' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.customer_type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items?.slice(0, 2).map((item, idx) => (
                      <div key={idx}>
                        {item.product_name} (x{item.quantity})
                      </div>
                    ))}
                    {order.items?.length > 2 && (
                      <p className="text-gray-500 text-xs mt-1">
                        +{order.items.length - 2} {t({ en: 'more items', vi: 'sản phẩm khác' })}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${parseFloat(order.total_amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                    {translateStatus(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {translateStatus(status)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {t({ en: 'No orders found', vi: 'Không tìm thấy đơn hàng nào' })}
          </div>
        )}
      </div>
    </div>
  )
}
