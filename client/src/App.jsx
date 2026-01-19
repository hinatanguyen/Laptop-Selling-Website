import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { useEffect } from 'react'
import useGlobalAdminNotifications from './hooks/useGlobalAdminNotifications'

// Layout
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminLogin from './pages/admin/AdminLogin'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'
import AdminUsers from './pages/admin/Users'
import AdminMessages from './pages/admin/Messages'
import NotFound from './pages/NotFound'

// Footer Pages
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import ShippingInfo from './pages/ShippingInfo'
import Returns from './pages/Returns'
import Warranty from './pages/Warranty'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  useEffect(() => {
    console.log('🎯 App component mounted')
    console.log('🌐 API URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  }, [])

  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </AuthProvider>
    </LanguageProvider>
  )
}

// Separate component to have access to auth context
function AppContent() {
  // Initialize global admin notifications
  const { isConnected } = useGlobalAdminNotifications()

  return (
    <div>
      {/* Show connection status for admins */}
      {isConnected && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs z-50">
          🔔 Live Notifications Active
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          {/* User login/register removed */}
          
          {/* Footer Pages */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="shipping-info" element={<ShippingInfo />} />
          <Route path="returns" element={<Returns />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          
          {/* Protected User Routes */}
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          
          {/* Admin Login */}
          <Route path="admin/login" element={<AdminLogin />} />

          {/* Admin Routes (protected) */}
          <Route path="admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="admin/products" element={<ProtectedAdmin><AdminProducts /></ProtectedAdmin>} />
          <Route path="admin/orders" element={<ProtectedAdmin><AdminOrders /></ProtectedAdmin>} />
          <Route path="admin/orders/:id" element={<ProtectedAdmin><OrderDetail /></ProtectedAdmin>} />
          <Route path="admin/users" element={<ProtectedAdmin><AdminUsers /></ProtectedAdmin>} />
          <Route path="admin/messages" element={<ProtectedAdmin><AdminMessages /></ProtectedAdmin>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

// Simple admin route guard
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedAdmin({ children }) {
  const { isAdmin } = useAuth()
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
