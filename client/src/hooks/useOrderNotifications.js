import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useOrderNotifications = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin || !user) return

    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000')

    newSocket.on('connect', () => {
      console.log('🔌 Connected to notification server')
      setIsConnected(true)
      
      // Identify as admin
      newSocket.emit('admin-connect', { role: user.role, userId: user.id })
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from notification server')
      setIsConnected(false)
    })

    // Listen for new order notifications
    newSocket.on('new-order', (notification) => {
      console.log('📦 New order notification:', notification)
      
      // Show toast notification
      toast.success(
        `New Order #${notification.data.id}\nCustomer: ${notification.data.customer_name}\nAmount: $${notification.data.total_amount}`,
        {
          duration: 6000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: 'white',
          },
        }
      )

      // Play notification sound (optional)
      if (typeof window !== 'undefined' && window.Audio) {
        try {
          const audio = new Audio('/notification-sound.mp3')
          audio.volume = 0.3
          audio.play().catch(e => console.log('Could not play notification sound:', e))
        } catch (e) {
          console.log('Notification sound not available')
        }
      }

      // Browser notification (if permission granted)
      if (Notification.permission === 'granted') {
        new Notification('New Order Received!', {
          body: `Order #${notification.data.id} from ${notification.data.customer_name}`,
          icon: '/favicon.ico'
        })
      }
    })

    // Listen for order status changes
    newSocket.on('order-status-change', (notification) => {
      toast.info(notification.message, {
        duration: 4000
      })
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [user, isAdmin])

  // Request notification permission on mount
  useEffect(() => {
    if (!isAdmin) return

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission)
      })
    }
  }, [isAdmin])

  return {
    socket,
    isConnected
  }
}

export default useOrderNotifications