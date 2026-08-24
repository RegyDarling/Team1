import { useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { categories, products } from './data/products'
import { CartProvider } from './context/CartProvider'
import { useCart } from './context/cartContext'
import './App.css'

const money = (amount) => `$${amount.toFixed(2)}`

function Navbar() {
  const { cartItemCount } = useCart()
  return <header className="navbar"><Link className="brand" to="/"><span className="brand-mark">M</span><span>Common Goods</span></Link><nav><NavLink to="/">Shop</NavLink><NavLink to="/cart" className="cart-link">Cart <span className="cart-count">{cartItemCount}</span></NavLink></nav></header>
}

function ProductCard({ product, index }) {
  const { addToCart } = useCart()
  return <article className="product-card" style={{ '--delay': `${index * 70}ms` }}><Link to={`/products/${product.id}`} className="product-image"><img src={product.image} alt={product.name} /><span className="view-label">View item</span></Link><div className="product-info"><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3></div><span className="price">{money(product.price)}</span></div><button className="add-button" type="button" onClick={() => addToCart(product)}>Add to cart <span>+</span></button></article>
}

function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filteredProducts = products.filter((product) => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase()))
  return <main><section className="hero-section"><p className="eyebrow">Thoughtful things, everyday</p><h1>Good goods for<br /><em>ordinary days.</em></h1><p className="hero-copy">A small collection of useful, beautiful objects made to be lived with.</p></section><section className="shop-toolbar"><div className="categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find something..." /></label></section><section className="product-grid">{filteredProducts.length ? filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />) : <p className="empty-search">No goods found. Try another search.</p>}</section></main>
}

function ProductDetails() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  if (!product) return <section className="not-found"><p className="eyebrow">404</p><h1>That item wandered off.</h1><Link className="button" to="/">Back to shop</Link></section>
  return <main className="detail-page"><Link className="back-link" to="/">Back to shop</Link><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p><div className="detail-purchase"><strong>{money(product.price)}</strong><button className="button" onClick={() => { addToCart(product); navigate('/cart') }}>Add to cart</button></div><p className="shipping-note">Free delivery on orders over $75</p></div></div></main>
}

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  return <div className="cart-item"><img src={item.image} alt="" /><div className="cart-item-info"><p className="eyebrow">{item.category}</p><h3>{item.name}</h3><p>{money(item.price)}</p></div><div className="quantity"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div><strong>{money(item.price * item.quantity)}</strong><button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button></div>
}

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const submit = (event) => { event.preventDefault(); if (!event.currentTarget.checkValidity() || !cart.length) { setError(cart.length ? 'Please complete every field.' : 'Your cart is empty.'); return } setError(''); setSubmitted(true); clearCart() }
  if (submitted) return <div className="success"><p className="eyebrow">Order received</p><h2>Thank you for shopping small.</h2><p>Your order is on its way to becoming real. We will send a confirmation shortly.</p><Link className="button" to="/">Continue shopping</Link></div>
  return <form className="checkout" onSubmit={submit}><p className="eyebrow">Checkout</p><h2>Almost yours.</h2><label>Full name<input required name="name" /></label><label>Address<input required name="address" /></label><label>Payment method<select required defaultValue=""><option value="" disabled>Select a method</option><option>Card (demo)</option><option>PayPal (demo)</option><option>Bank transfer (demo)</option></select></label>{error && <p className="form-error">{error}</p>}<button className="button" type="submit">Place order · {money(cartTotal)}</button></form>
}

function Cart() {
  const { cart, cartTotal } = useCart()
  return <main className="cart-page"><div className="page-heading"><p className="eyebrow">Your selection</p><h1>Shopping cart</h1></div>{cart.length ? <div className="cart-layout"><section className="cart-items">{cart.map((item) => <CartItem key={item.id} item={item} />)}<div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div></section><Checkout /></div> : <div className="empty-cart"><h2>Your cart is waiting.</h2><p>Fill it with something useful, beautiful, or both.</p><Link className="button" to="/">Browse the collection</Link></div>}</main>
}

function App() {
  return <CartProvider><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/products/:id" element={<ProductDetails />} /><Route path="/cart" element={<Cart />} /><Route path="*" element={<ProductDetails />} /></Routes><footer><span>Common Goods</span><span>Made for the everyday</span></footer></CartProvider>
}

export default App
