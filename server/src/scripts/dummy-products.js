// Centralized dummy product data for seeding
// Keep this as the single source of truth for product fixtures

const dummyProducts = [
  {
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Ultrabook',
    processor: 'Intel Core i7-1185G7',
    price: 1299.99,
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    specs: {
      screen: '13.4" FHD+',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe',
      battery: '52WHr',
      weight: '2.64 lbs'
    },
    description: 'Compact and powerful ultrabook for professionals',
    featured: true
  },
  {
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    category: 'Professional',
    processor: 'Apple M3 Pro',
    price: 1999.99,
    stock: 10,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    specs: {
      screen: '14.2" Liquid Retina XDR',
      ram: '18GB Unified Memory',
      storage: '512GB SSD',
      graphics: 'Apple M3 Pro GPU',
      battery: '70WHr',
      weight: '3.5 lbs'
    },
    description: 'Professional laptop with M3 Pro chip',
    featured: true
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'Business',
    processor: 'Intel Core i7-1165G7',
    price: 1499.99,
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    specs: {
      screen: '14" WUXGA',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe',
      battery: '57WHr',
      weight: '2.49 lbs'
    },
    description: 'Business laptop with military-grade durability',
    featured: false
  },
  {
    name: 'HP Spectre x360',
    brand: 'HP',
    category: '2-in-1',
    processor: 'Intel Core i7-1255U',
    price: 1399.99,
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    specs: {
      screen: '13.5" 3K2K Touch',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe',
      battery: '66WHr',
      weight: '3.01 lbs'
    },
    description: 'Versatile 2-in-1 convertible laptop',
    featured: false
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    brand: 'ASUS',
    category: 'Gaming',
    processor: 'AMD Ryzen 9 6900HS',
    price: 1849.99,
    stock: 8,
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    specs: {
      screen: '14" QHD 120Hz',
      ram: '16GB DDR5',
      storage: '1TB SSD',
      graphics: 'NVIDIA RTX 3060',
      battery: '76WHr',
      weight: '3.64 lbs'
    },
    description: 'Compact gaming laptop with powerful performance',
    featured: true
  },
  {
    name: 'Microsoft Surface Laptop 5',
    brand: 'Microsoft',
    category: 'Ultrabook',
    processor: 'Intel Core i7-1255U',
    price: 1299.99,
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
    specs: {
      screen: '13.5" PixelSense',
      ram: '16GB LPDDR5x',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe',
      battery: '47.4WHr',
      weight: '2.8 lbs'
    },
    description: 'Sleek and elegant laptop with touchscreen',
    featured: false
  },
  {
    name: 'Acer Predator Helios 300',
    brand: 'Acer',
    category: 'Gaming',
    processor: 'Intel Core i7-12700H',
    price: 1599.99,
    stock: 10,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
    specs: {
      screen: '15.6" FHD 144Hz',
      ram: '16GB DDR5',
      storage: '512GB SSD',
      graphics: 'NVIDIA RTX 3060',
      battery: '90WHr',
      weight: '5.51 lbs'
    },
    description: 'High-performance gaming laptop',
    featured: false
  },
  {
    name: 'Razer Blade 15',
    brand: 'Razer',
    category: 'Gaming',
    processor: 'Intel Core i7-12800H',
    price: 2499.99,
    stock: 6,
    image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
    specs: {
      screen: '15.6" QHD 240Hz',
      ram: '16GB DDR5',
      storage: '1TB SSD',
      graphics: 'NVIDIA RTX 3070 Ti',
      battery: '80WHr',
      weight: '4.4 lbs'
    },
    description: 'Premium gaming laptop with sleek design',
    featured: true
  },
  {
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'Professional',
    processor: 'Intel Core i7-12700H',
    price: 1799.99,
    stock: 14,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    specs: {
      screen: '15.6" 4K OLED',
      ram: '32GB DDR5',
      storage: '1TB SSD',
      graphics: 'NVIDIA RTX 3050 Ti',
      battery: '86WHr',
      weight: '4.22 lbs'
    },
    description: 'High-end content creation laptop',
    featured: false
  },
  {
    name: 'MacBook Air M2',
    brand: 'Apple',
    category: 'Ultrabook',
    processor: 'Apple M2',
    price: 1199.99,
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    specs: {
      screen: '13.6" Liquid Retina',
      ram: '8GB Unified Memory',
      storage: '256GB SSD',
      graphics: 'Apple M2 GPU',
      battery: '52.6WHr',
      weight: '2.7 lbs'
    },
    description: 'Ultra-thin laptop with M2 chip',
    featured: true
  },
  {
    name: 'ASUS ZenBook 14',
    brand: 'ASUS',
    category: 'Ultrabook',
    processor: 'AMD Ryzen 7 5800H',
    price: 899.99,
    stock: 22,
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    specs: {
      screen: '14" FHD',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      graphics: 'AMD Radeon Graphics',
      battery: '63WHr',
      weight: '2.87 lbs'
    },
    description: 'Affordable ultrabook with AMD power',
    featured: false
  },
  {
    name: 'HP Pavilion Gaming 15',
    brand: 'HP',
    category: 'Gaming',
    processor: 'Intel Core i5-12500H',
    price: 999.99,
    stock: 16,
    image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
    specs: {
      screen: '15.6" FHD 144Hz',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      graphics: 'NVIDIA GTX 1650',
      battery: '52.5WHr',
      weight: '5.08 lbs'
    },
    description: 'Budget-friendly gaming laptop',
    featured: false
  },
  {
    name: 'Lenovo Legion 5 Pro',
    brand: 'Lenovo',
    category: 'Gaming',
    processor: 'AMD Ryzen 7 5800H',
    price: 1399.99,
    stock: 11,
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    specs: {
      screen: '16" QHD 165Hz',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      graphics: 'NVIDIA RTX 3060',
      battery: '80WHr',
      weight: '5.4 lbs'
    },
    description: 'Powerful gaming laptop with large screen',
    featured: false
  },
  {
    name: 'Surface Pro 9',
    brand: 'Microsoft',
    category: '2-in-1',
    processor: 'Intel Core i7-1255U',
    price: 1599.99,
    stock: 13,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
    specs: {
      screen: '13" PixelSense Flow',
      ram: '16GB LPDDR5',
      storage: '256GB SSD',
      graphics: 'Intel Iris Xe',
      battery: '47.36WHr',
      weight: '1.94 lbs'
    },
    description: '2-in-1 tablet laptop hybrid',
    featured: true
  },
  {
    name: 'Alienware x14',
    brand: 'Dell',
    category: 'Gaming',
    processor: 'Intel Core i7-12700H',
    price: 2199.99,
    stock: 7,
    image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
    specs: {
      screen: '14" FHD 144Hz',
      ram: '16GB DDR5',
      storage: '512GB SSD',
      graphics: 'NVIDIA RTX 3060',
      battery: '87WHr',
      weight: '4.06 lbs'
    },
    description: 'Compact gaming powerhouse',
    featured: false
  }
]

export default dummyProducts
