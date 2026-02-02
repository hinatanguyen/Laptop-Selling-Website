import { Server as SocketIOServer } from 'socket.io'

class NotificationService {
  constructor() {
    this.io = null
    this.adminSockets = new Set()
  }

  init(server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: [
          "http://localhost:3000", 
          "http://localhost:5173",
          process.env.FRONTEND_URL,
          "https://mango-desert-0c82ffb00.4.azurestaticapps.net"
        ].filter(Boolean),
        methods: ["GET", "POST"],
        credentials: true
      }
    })

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Handle admin connection
      socket.on('admin-connect', (adminData) => {
        if (adminData.role === 'admin') {
          this.adminSockets.add(socket)
          console.log('Admin connected:', socket.id)
        }
      })

      // Handle disconnection
      socket.on('disconnect', () => {
        this.adminSockets.delete(socket)
        console.log('Client disconnected:', socket.id)
      })
    })

    return this.io
  }

  // Notify all connected admins about new order
  notifyNewOrder(orderData) {
    if (!this.io) return

    const notification = {
      type: 'NEW_ORDER',
      message: `New order #${orderData.id} from ${orderData.customer_name}`,
      data: orderData,
      timestamp: new Date().toISOString()
    }

    // Send to all connected admin clients
    this.adminSockets.forEach(socket => {
      socket.emit('new-order', notification)
    })

    console.log('📢 New order notification sent to', this.adminSockets.size, 'admins')
  }

  // Notify about order status changes
  notifyOrderStatusChange(orderData) {
    if (!this.io) return

    const notification = {
      type: 'ORDER_STATUS_CHANGE',
      message: `Order #${orderData.id} status changed to ${orderData.status}`,
      data: orderData,
      timestamp: new Date().toISOString()
    }

    // Notify both admins and the customer who placed the order
    this.adminSockets.forEach(socket => {
      socket.emit('order-status-change', notification)
    })

    // Notify the specific customer (if connected)
    this.io.emit(`order-update-${orderData.user_id}`, notification)
  }

  // Get notification stats
  getConnectedAdmins() {
    return this.adminSockets.size
  }

  // Notify admins of new contact message
  notifyNewContact(contactData) {
    if (!this.io) return

    const notification = {
      type: 'NEW_CONTACT',
      message: `New contact from ${contactData.name}: ${contactData.subject}`,
      data: contactData,
      timestamp: new Date().toISOString()
    }

    this.adminSockets.forEach(socket => {
      socket.emit('new-contact', notification)
    })

    console.log('📢 New contact notification sent to', this.adminSockets.size, 'admins')
  }
}

export default new NotificationService()