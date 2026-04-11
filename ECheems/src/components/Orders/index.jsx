import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const ORDERS_STORAGE_KEY = 'cheems_orders'
const CART_STORAGE_KEY = 'cheems_cart'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
    const ordersList = storedOrders ? JSON.parse(storedOrders) : []
    setOrders(ordersList.reverse())
  }, [])

  const toggleOrderDetails = orderId => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const handleOrderAgain = order => {
    // Get current cart from localStorage
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    const currentCart = storedCart ? JSON.parse(storedCart) : []

    // Add order items to cart
    order.items.forEach(orderItem => {
      const existingIndex = currentCart.findIndex(item => item.id === orderItem.id)
      if (existingIndex >= 0) {
        // Item already in cart, increase quantity
        currentCart[existingIndex].quantity += orderItem.quantity
      } else {
        // Add new item to cart
        currentCart.push(orderItem)
      }
    })

    // Save updated cart
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart))

    // Show success message
    setSuccessMessage(`✓ Added ${order.items.length} item(s) to cart!`)

    // Navigate to cart after showing message
    setTimeout(() => {
      navigate('/cart')
    }, 1500)
  }

  const renderEmptyOrders = () => (
    <div className="empty-orders-state">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-no-products-img.png"
        alt="no orders"
        className="empty-orders-image"
      />
      <h1 className="empty-orders-heading">No Orders Yet</h1>
      <p className="empty-orders-description">
        You haven&apos;t placed any orders yet. Start shopping now!
      </p>
      <button
        type="button"
        className="button shop-button"
        onClick={() => navigate('/products')}
      >
        Start Shopping
      </button>
    </div>
  )

  const renderOrdersList = () => (
    <div className="orders-list-wrapper">
      <h1 className="orders-page-heading">My Orders</h1>
      <p className="orders-subtitle">
        {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
      </p>

      <ul className="orders-list">
        {orders.map(order => (
          <li key={order.orderId} className="order-card">
            <div
              className="order-header"
              onClick={() => toggleOrderDetails(order.orderId)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleOrderDetails(order.orderId)
                }
              }}
            >
              <div className="order-header-left">
                <div className="order-id-badge">{order.orderId}</div>
                <div className="order-header-info">
                  <p className="order-date-time">
                    {order.orderDate} at {order.orderTime}
                  </p>
                  <p className="order-items-count">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <div className="order-header-right">
                <div className="order-amount">
                  <p className="order-amount-label">Total Amount</p>
                  <p className="order-amount-value">Rs {order.total}/-</p>
                </div>
                <div className="order-status-badge confirmed">
                  {order.status}
                </div>
                <div
                  className={`order-toggle-icon ${
                    expandedOrderId === order.orderId ? 'expanded' : ''
                  }`}
                >
                  ▼
                </div>
              </div>
            </div>

            {expandedOrderId === order.orderId && (
              <div className="order-details">
                <div className="order-details-section">
                  <h3 className="section-heading">Order Items</h3>
                  <ul className="order-items-details">
                    {order.items.map(item => (
                      <li key={item.id} className="order-item-detail">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="order-item-image"
                        />
                        <div className="order-item-info">
                          <h4 className="order-item-title">{item.title}</h4>
                          <p className="order-item-brand">by {item.brand}</p>
                          <p className="order-item-amount">
                            Rs {item.price}/- × {item.quantity}
                          </p>
                        </div>
                        <p className="order-item-total">
                          Rs {item.price * item.quantity}/-
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-details-section">
                  <h3 className="section-heading">Price Details</h3>
                  <div className="price-details-table">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>Rs {order.subtotal}/-</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="price-row discount">
                        <span>Discount ({order.appliedCoupon})</span>
                        <span>-Rs {order.discount}/-</span>
                      </div>
                    )}
                    <div className="price-row">
                      <span>Tax (5%)</span>
                      <span>Rs {order.tax}/-</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>Rs {order.total}/-</span>
                    </div>
                  </div>
                </div>

                <div className="order-details-section">
                  <h3 className="section-heading">Shipping Address</h3>
                  <div className="shipping-details">
                    <p className="shipping-name">{order.shippingAddress.name}</p>
                    <p className="shipping-address">
                      {order.shippingAddress.address}
                    </p>
                    <p className="shipping-location">
                      {order.shippingAddress.city}, {order.shippingAddress.state} -
                      {' '}
                      {order.shippingAddress.pincode}
                    </p>
                    <p className="shipping-contact">
                      Email: {order.shippingAddress.email}
                    </p>
                    <p className="shipping-contact">
                      Phone: {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>

                <div className="order-actions">
                  <button
                    type="button"
                    className="button download-button"
                    onClick={() => {
                      const orderText = `
ORDER CONFIRMATION
==================
Order ID: ${order.orderId}
Order Date: ${order.orderDate}
Order Time: ${order.orderTime}

ITEMS:
${order.items.map(item => `- ${item.title} (Qty: ${item.quantity}) - Rs ${item.price * item.quantity}/-`).join('\n')}

PRICE BREAKDOWN:
Subtotal: Rs ${order.subtotal}/-
Discount: -Rs ${order.discount}/-
Tax (5%): Rs ${order.tax}/-
Total: Rs ${order.total}/-

SHIPPING ADDRESS:
${order.shippingAddress.name}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
Email: ${order.shippingAddress.email}
Phone: ${order.shippingAddress.phone}

Status: ${order.status}
`.trim()

                      const element = document.createElement('a')
                      element.setAttribute(
                        'href',
                        `data:text/plain;charset=utf-8,${encodeURIComponent(orderText)}`,
                      )
                      element.setAttribute('download', `${order.orderId}.txt`)
                      element.style.display = 'none'
                      document.body.appendChild(element)
                      element.click()
                      document.body.removeChild(element)
                    }}
                  >
                    Download Details
                  </button>
                  <button
                    type="button"
                    className="button order-again-button"
                    onClick={() => handleOrderAgain(order)}
                  >
                    Order Again
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Header />
      {successMessage && (
        <div className="order-success-notification">
          {successMessage}
        </div>
      )}
      <div className="orders-page-container">
        {orders.length === 0 ? renderEmptyOrders() : renderOrdersList()}
      </div>
    </>
  )
}

export default Orders
