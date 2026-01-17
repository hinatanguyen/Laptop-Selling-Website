import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
          })
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      // Remove invalid items from cart
      validateItems: async () => {
        const items = get().items
        const validItems = []
        
        for (const item of items) {
          try {
            // Check if product still exists
            const response = await fetch(`/api/products/${item.id}`)
            if (response.ok) {
              validItems.push(item)
            } else {
              console.log(`Removed invalid product from cart: ${item.name}`)
            }
          } catch (error) {
            console.log(`Removed invalid product from cart: ${item.name}`)
          }
        }
        
        if (validItems.length !== items.length) {
          set({ items: validItems })
        }
      },
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
