import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { adminAPI } from '../../services/api'
import Loading from '../../components/Loading'
import {
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await adminAPI.getDashboardStats()
      setStats(response.data.stats || {
        total_revenue: 0,
        total_orders: 0,
        total_users: 0,
        total_products: 0
      })
      setRecentOrders(response.data.recentOrders || [])
    } catch (error) {
      console.error('Dashboard error:', error)
      toast.error('Failed to load dashboard')
      // Set default stats on error
      setStats({
        total_revenue: 0,
        total_orders: 0,
        total_users: 0,
        total_products: 0
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (!stats) return <Loading />

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${parseFloat(stats.total_revenue || 0).toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Total Orders',
      value: stats.total_orders || 0,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Users',
      value: stats.total_users || 0,
      icon: UsersIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Total Products',
      value: stats.total_products || 0,
      icon: CubeIcon,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
        >
          <CubeIcon className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">Manage Products</h3>
          <p className="text-gray-600 mt-2">Add, edit, or delete products</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
        >
          <ShoppingBagIcon className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">Manage Orders</h3>
          <p className="text-gray-600 mt-2">View and update order status</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
        >
          <UsersIcon className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">Manage Users</h3>
          <p className="text-gray-600 mt-2">View and manage user accounts</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(order.total_amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
