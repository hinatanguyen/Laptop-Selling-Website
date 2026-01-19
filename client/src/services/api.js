import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  search: (query) => api.get(`/products/search?q=${query}`)
}

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart', { productId, quantity }),
  update: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  remove: (itemId) => api.delete(`/cart/${itemId}`),
  clear: () => api.delete('/cart')
}

// Orders API
export const ordersAPI = {
  createOrder: (data) => api.post('/orders', data),
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  // Alias used by client pages
  getUserOrders: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  // Match server route: PATCH /orders/:id/cancel
  cancelOrder: (id) => api.patch(`/orders/${id}/cancel`)
}

// Auth API
export const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/admin/login', { email, password })
    return data
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile')
    return data
  },
  updateProfile: async (userData) => {
    const { data } = await api.put('/auth/profile', userData)
    return data
  }
}

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getOrders: (params) => api.get('/admin/orders', { params }),
  getOrderById: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  // Product management (uses /api/products endpoints with admin auth)
  getProducts: (params) => api.get('/products', { params }),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  // User management
  getUsers: () => api.get('/admin/users'),
  // Contact messages
  getContactMessages: (params) => api.get('/admin/contact-messages', { params }),
  updateContactMessageStatus: (id, status) => api.patch(`/admin/contact-messages/${id}/status`, { status }),
  deleteContactMessage: (id) => api.delete(`/admin/contact-messages/${id}`)
}

// Shop Reviews API (public)
export const reviewsAPI = {
  getAll: (params) => api.get('/reviews', { params })
}

export default api
