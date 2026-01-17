import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, user } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const redirectTo = searchParams.get('redirect') || '/'

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirectTo)
    }
  }, [user, navigate, redirectTo])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success(t({ en: 'Login successful!', vi: 'Đăng nhập thành công!' }))
      navigate(redirectTo)
    } catch (error) {
      toast.error(error.response?.data?.message || t({ en: 'Login failed', vi: 'Đăng nhập thất bại' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t({ en: 'Welcome Back', vi: 'Chào Mừng Trở Lại' })}</h2>
          <p className="mt-2 text-gray-600">{t({ en: 'Sign in to your account', vi: 'Đăng nhập vào tài khoản của bạn' })}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Email Address', vi: 'Địa Chỉ Email' })}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Password', vi: 'Mật Khẩu' })}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{t({ en: 'Remember me', vi: 'Ghi nhớ đăng nhập' })}</span>
              </label>

              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                {t({ en: 'Forgot password?', vi: 'Quên mật khẩu?' })}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? t({ en: 'Signing in...', vi: 'Đang đăng nhập...' }) : t({ en: 'Sign In', vi: 'Đăng Nhập' })}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t({ en: "Don't have an account?", vi: 'Chưa có tài khoản?' })}{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                {t({ en: 'Sign up', vi: 'Đăng ký' })}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
