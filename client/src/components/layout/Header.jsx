import { useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { useCartStore } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import LanguageSwitcher from '../LanguageSwitcher'

const categories = [
  {
    name: { en: 'View All', vi: 'Xem Tất Cả' },
    items: [
      { name: { en: 'All Products', vi: 'Tất Cả Sản Phẩm' }, href: '/products' },
    ],
  },
  {
    name: { en: 'Categories', vi: 'Danh Mục' },
    items: [
      { name: { en: 'Gaming Laptops', vi: 'Laptop Gaming' }, href: '/products?category=Gaming' },
      { name: { en: 'Business Laptops', vi: 'Laptop Doanh Nghiệp' }, href: '/products?category=Business' },
      { name: { en: 'Ultrabooks', vi: 'Ultrabook' }, href: '/products?category=Ultrabook' },
      { name: { en: 'Professional', vi: 'Chuyên nghiệp' }, href: '/products?category=Professional' },
      { name: { en: '2-in-1 Laptops', vi: 'Laptop 2-trong-1' }, href: '/products?category=2-in-1' },
    ],
  },
  {
    name: { en: 'Brands', vi: 'Thương Hiệu' },
    items: [
      { name: { en: 'Dell', vi: 'Dell' }, href: '/products?brand=Dell' },
      { name: { en: 'Apple', vi: 'Apple' }, href: '/products?brand=Apple' },
      { name: { en: 'ASUS', vi: 'ASUS' }, href: '/products?brand=ASUS' },
      { name: { en: 'HP', vi: 'HP' }, href: '/products?brand=HP' },
      { name: { en: 'Lenovo', vi: 'Lenovo' }, href: '/products?brand=Lenovo' },
      { name: { en: 'Microsoft', vi: 'Microsoft' }, href: '/products?brand=Microsoft' },
      { name: { en: 'Acer', vi: 'Acer' }, href: '/products?brand=Acer' },
      { name: { en: 'Razer', vi: 'Razer' }, href: '/products?brand=Razer' },
    ],
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cartItemCount = useCartStore((state) => state.getItemCount())
  const { user, logout, isAdmin } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span>📞 +1 (555) 123-4567</span>
            <span>✉️ support@techstore.com</span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <span>{t({ en: 'Welcome', vi: 'Chào mừng' })}, {user.full_name || user.email}!</span>
            ) : (
              <>
                <Link to="/login" className="hover:underline">{t({ en: 'Login', vi: 'Đăng nhập' })}</Link>
                <Link to="/register" className="hover:underline">{t({ en: 'Register', vi: 'Đăng ký' })}</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>TechStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              {t({ en: 'Home', vi: 'Trang chủ' })}
            </Link>
            
            {/* Products Mega Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="text-gray-700 hover:text-primary-600 font-semibold transition flex items-center gap-1">
                {t({ en: 'Products', vi: 'Sản phẩm' })}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Menu.Items className="absolute left-0 mt-2 w-screen max-w-4xl bg-white rounded-xl shadow-2xl p-8 grid grid-cols-3 gap-8">
                  {categories.map((category) => (
                    <div key={t(category.name)}>
                      <h3 className="font-bold text-gray-900 mb-4 border-b-2 border-primary-600 pb-2">
                        {t(category.name)}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <Menu.Item key={t(item.name)}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={`block text-sm ${
                                  active ? 'text-primary-600 pl-2' : 'text-gray-600'
                                } transition-all`}
                              >
                                {t(item.name)}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              {t({ en: 'About', vi: 'Giới thiệu' })}
            </Link>

            <Link to="/support" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              {t({ en: 'Support', vi: 'Hỗ trợ' })}
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-semibold transition">
              {t({ en: 'Contact', vi: 'Liên hệ' })}
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-semibold transition">
                {t({ en: 'Admin', vi: 'Quản lý' })}
              </Link>
            )}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t({ en: 'Search products...', vi: 'Tìm kiếm sản phẩm...' })}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </form>

            {/* User Menu */}
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <UserIcon className="w-6 h-6 text-gray-700" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Menu.Item>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {t({ en: 'Profile', vi: 'Hồ sơ' })}
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {t({ en: 'My Orders', vi: 'Đơn hàng của tôi' })}
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        {t({ en: 'Logout', vi: 'Đăng xuất' })}
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition">
                <UserIcon className="w-6 h-6 text-gray-700" />
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-700 font-semibold">{t({ en: 'Home', vi: 'Trang chủ' })}</Link>
            <Link to="/products" className="block text-gray-700 font-semibold">{t({ en: 'Products', vi: 'Sản phẩm' })}</Link>
            {isAdmin && (
              <Link to="/admin" className="block text-gray-700 font-semibold">{t({ en: 'Admin', vi: 'Quản lý' })}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
