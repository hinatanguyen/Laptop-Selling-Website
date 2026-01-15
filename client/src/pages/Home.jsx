import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import { useLanguage } from '../context/LanguageContext'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=600&fit=crop',
    title: { en: 'Ultimate Gaming Experience', vi: 'Trải Nghiệm Gaming Đỉnh Cao' },
    subtitle: { en: 'Discover powerful gaming laptops with RTX graphics', vi: 'Khám phá laptop gaming mạnh mẽ với card đồ họa RTX' },
    link: '/products?category=Gaming',
    button: { en: 'Shop Now', vi: 'Mua Ngay' }
  },
  {
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&h=600&fit=crop',
    title: { en: 'Business Solutions', vi: 'Giải Pháp Doanh Nghiệp' },
    subtitle: { en: 'Professional laptops for productivity and mobility', vi: 'Laptop chuyên nghiệp cho năng suất và di động' },
    link: '/products?category=Business',
    button: { en: 'Shop Now', vi: 'Mua Ngay' }
  },
  {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&h=600&fit=crop',
    title: { en: 'Slim & Powerful', vi: 'Mỏng Nhẹ & Mạnh Mẽ' },
    subtitle: { en: 'Premium ultrabooks for professionals on the go', vi: 'Ultrabook cao cấp cho chuyên gia di động' },
    link: '/products?category=Ultrabook',
    button: { en: 'Shop Now', vi: 'Mua Ngay' }
  }
]

const categories = [
  { name: { en: 'Gaming Laptops', vi: 'Laptop Gaming' }, icon: '🎮', link: '/products?category=Gaming' },
  { name: { en: 'Business Laptops', vi: 'Laptop Doanh Nghiệp' }, icon: '💼', link: '/products?category=Business' },
  { name: { en: 'Ultrabooks', vi: 'Ultrabook' }, icon: '💻', link: '/products?category=Ultrabook' },
  { name: { en: 'Workstations', vi: 'Máy Trạm' }, icon: '🖥️', link: '/products?category=Workstation' },
]

const features = [
  { icon: '🚚', title: { en: 'Free Shipping', vi: 'Miễn Phí Vận Chuyển' }, text: { en: 'On orders over $500', vi: 'Cho đơn hàng trên $500' } },
  { icon: '🛡️', title: { en: 'Secure Payment', vi: 'Thanh Toán An Toàn' }, text: { en: '100% secure transactions', vi: '100% giao dịch bảo mật' } },
  { icon: '↩️', title: { en: '30-Day Returns', vi: 'Đổi Trả 30 Ngày' }, text: { en: 'Easy return policy', vi: 'Chính sách đổi trả dễ dàng' } },
  { icon: '💬', title: { en: '24/7 Support', vi: 'Hỗ Trợ 24/7' }, text: { en: 'Dedicated customer service', vi: 'Dịch vụ khách hàng tận tâm' } },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      const { data } = await productsAPI.getAll({ featured: true, limit: 6 })
      setFeaturedProducts(data.products || [])
    } catch (error) {
      // Silent fail - products will be empty array
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                  {t(slide.title)}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in">
                  {t(slide.subtitle)}
                </p>
                <Link to={slide.link} className="btn-primary inline-block">
                  {t(slide.button)} →
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t({ en: 'Shop by Category', vi: 'Mua Theo Danh Mục' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={t(category.name)}
                to={category.link}
                className="card p-8 text-center hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold">{t(category.name)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">{t({ en: 'Featured Products', vi: 'Sản Phẩm Nổi Bật' })}</h2>
            <Link to="/products" className="text-primary-600 font-semibold hover:underline">
              {t({ en: 'View All', vi: 'Xem Tất Cả' })} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={t(feature.title)} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.title)}</h3>
                <p className="text-gray-600">{t(feature.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
