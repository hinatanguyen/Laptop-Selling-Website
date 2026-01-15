import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=600&fit=crop',
    title: 'Ultimate Gaming Experience',
    subtitle: 'Discover powerful gaming laptops with RTX graphics',
    link: '/products?category=Gaming'
  },
  {
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&h=600&fit=crop',
    title: 'Business Solutions',
    subtitle: 'Professional laptops for productivity and mobility',
    link: '/products?category=Business'
  },
  {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&h=600&fit=crop',
    title: 'Slim & Powerful',
    subtitle: 'Premium ultrabooks for professionals on the go',
    link: '/products?category=Ultrabook'
  }
]

const categories = [
  { name: 'Gaming Laptops', icon: '🎮', link: '/products?category=Gaming' },
  { name: 'Business Laptops', icon: '💼', link: '/products?category=Business' },
  { name: 'Ultrabooks', icon: '💻', link: '/products?category=Ultrabook' },
  { name: 'Workstations', icon: '🖥️', link: '/products?category=Workstation' },
]

const features = [
  { icon: '🚚', title: 'Free Shipping', text: 'On orders over $500' },
  { icon: '🛡️', title: 'Secure Payment', text: '100% secure transactions' },
  { icon: '↩️', title: '30-Day Returns', text: 'Easy return policy' },
  { icon: '💬', title: '24/7 Support', text: 'Dedicated customer service' },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in">
                  {slide.subtitle}
                </p>
                <Link to={slide.link} className="btn-primary inline-block">
                  Shop Now →
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
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="card p-8 text-center hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 font-semibold hover:underline">
              View All →
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
              <div key={feature.title} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
