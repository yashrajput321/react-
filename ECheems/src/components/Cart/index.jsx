import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const CART_STORAGE_KEY = 'cheems_cart'

const loadCartItems = () => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)
  return storedCart ? JSON.parse(storedCart) : []
}

const saveCartItems = cartItems => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
}

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(loadCartItems())
  }, [])

  const updateCart = updatedItems => {
    setCartItems(updatedItems)
    saveCartItems(updatedItems)
  }

  const removeItem = itemId => {
    const updatedItems = cartItems.filter(item => item.id !== itemId)
    updateCart(updatedItems)
  }

  const changeQuantity = (itemId, delta) => {
    const updatedItems = cartItems
      .map(item =>
        item.id === itemId
          ? {...item, quantity: Math.max(1, item.quantity + delta)}
          : item,
      )
      .filter(item => item.quantity > 0)

    updateCart(updatedItems)
  }

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const renderEmptyCart = () => (
    <div className="cart-empty-state">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="cart-empty-heading">Your cart is empty</h1>
      <p className="cart-empty-description">
        Add items to your cart and they will appear here.
      </p>
      <Link to="/products" className="continue-shopping-button">
        Continue Shopping
      </Link>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-content-wrapper">
      <h1 className="cart-page-heading">Shopping Cart</h1>
      <ul className="cart-items-list">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item-card">
            <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h2 className="cart-item-title">{item.title}</h2>
              <p className="cart-item-brand">by {item.brand}</p>
              <p className="cart-item-price">Rs {item.price}/-</p>
              <div className="cart-quantity-control">
                <button
                  type="button"
                  className="cart-quantity-button"
                  onClick={() => changeQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="cart-quantity-value">{item.quantity}</span>
                <button
                  type="button"
                  className="cart-quantity-button"
                  onClick={() => changeQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="remove-item-button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary-card">
        <p className="cart-summary-text">
          Total items: <span>{cartItems.length}</span>
        </p>
        <p className="cart-summary-text">
          Total price: <span>Rs {calculateTotal()}/-</span>
        </p>
        <button 
          type="button" 
          className="checkout-button"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <div className="cart-page-container">
        {cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}
      </div>
    </>
  )
}

export default Cart
