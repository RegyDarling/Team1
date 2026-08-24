import { useEffect, useReducer } from 'react'
import { CartContext } from './cartContext'

const storageKey = 'mini-market-cart'

function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const existing = cart.find((item) => item.id === action.product.id)
      if (existing) return cart.map((item) => item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...cart, { ...action.product, quantity: 1 }]
    }
    case 'remove': return cart.filter((item) => item.id !== action.id)
    case 'update': return cart.map((item) => item.id === action.id ? { ...item, quantity: Math.max(1, action.quantity) } : item)
    case 'clear': return []
    default: return cart
  }
}

function getSavedCart() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getSavedCart)
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(cart)) }, [cart])
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  return <CartContext.Provider value={{ cart, cartTotal, cartItemCount, addToCart: (product) => dispatch({ type: 'add', product }), removeFromCart: (id) => dispatch({ type: 'remove', id }), updateQuantity: (id, quantity) => dispatch({ type: 'update', id, quantity }), clearCart: () => dispatch({ type: 'clear' }) }}>{children}</CartContext.Provider>
}
