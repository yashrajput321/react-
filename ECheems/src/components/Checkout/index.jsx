import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const CART_STORAGE_KEY = 'cheems_cart'
const ORDERS_STORAGE_KEY = 'cheems_orders'
const SAVED_ADDRESSES_KEY = 'cheems_saved_addresses'

// Sample coupon codes with discount percentages
const AVAILABLE_COUPONS = {
  FIRST50: {code: 'FIRST50', discountPercent: 10},
  SAVE20: {code: 'SAVE20', discountPercent: 20},
  PROMO30: {code: 'PROMO30', discountPercent: 30},
  FLAT500: {code: 'FLAT500', discountAmount: 500},
}

const Checkout = () => {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [saveAddress, setSaveAddress] = useState(true)
  const [showAddressForm, setShowAddressForm] = useState(true)

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    const cart = storedCart ? JSON.parse(storedCart) : []
    if (cart.length === 0) {
      navigate('/cart')
    }
    setCartItems(cart)

    // Load saved addresses
    const savedAddrs = localStorage.getItem(SAVED_ADDRESSES_KEY)
    if (savedAddrs) {
      const addresses = JSON.parse(savedAddrs)
      setSavedAddresses(addresses)
      if (addresses.length > 0) {
        setShowAddressForm(false)
      }
    }
  }, [navigate])

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    const subtotal = calculateSubtotal()

    if (appliedCoupon.discountPercent) {
      return Math.floor(subtotal * (appliedCoupon.discountPercent / 100))
    }
    if (appliedCoupon.discountAmount) {
      return Math.min(appliedCoupon.discountAmount, subtotal)
    }
    return 0
  }

  const calculateTax = () => {
    const subtotal = calculateSubtotal()
    const afterDiscount = subtotal - calculateDiscount()
    return Math.floor(afterDiscount * 0.05)
  }

  const calculateTotal = () =>
    calculateSubtotal() - calculateDiscount() + calculateTax()

  const handleInputChange = e => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
    if (formErrors[name]) {
      setFormErrors(prev => ({...prev, [name]: ''}))
    }
  }

  const handleSelectAddress = address => {
    setSelectedAddressId(address.id)
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    })
    setShowAddressForm(false)
  }

  const handleSaveAddress = () => {
    if (!saveAddress) return

    const newAddress = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      createdAt: new Date().toLocaleDateString('en-IN'),
    }

    const updated = [...savedAddresses, newAddress]
    setSavedAddresses(updated)
    localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(updated))
  }

  const handleDeleteAddress = addressId => {
    const updated = savedAddresses.filter(addr => addr.id !== addressId)
    setSavedAddresses(updated)
    localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(updated))
    if (selectedAddressId === addressId) {
      setSelectedAddressId(null)
      setShowAddressForm(true)
    }
  }

  const handleAddNewAddress = () => {
    setShowAddressForm(true)
    setSelectedAddressId(null)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    })
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits'
    }
    if (!formData.address.trim()) errors.address = 'Address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required'
    if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = 'Pincode must be 6 digits'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    const upperCode = couponCode.toUpperCase().trim()

    if (!upperCode) {
      setCouponError('Please enter a coupon code')
      return
    }

    if (AVAILABLE_COUPONS[upperCode]) {
      setAppliedCoupon(AVAILABLE_COUPONS[upperCode])
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return
    }

    const newOrder = {
      orderId: `ORD${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-IN'),
      orderTime: new Date().toLocaleTimeString('en-IN'),
      items: cartItems,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      appliedCoupon: appliedCoupon ? appliedCoupon.code : 'None',
      tax: calculateTax(),
      total: calculateTotal(),
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      status: 'Confirmed',
    }

    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || []
    orders.push(newOrder)
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))

    localStorage.removeItem(CART_STORAGE_KEY)

    // Save address if checkbox is checked
    if (saveAddress) {
      handleSaveAddress()
    }

    setOrderDetails(newOrder)
    setOrderPlaced(true)
  }

  if (orderPlaced && orderDetails) {
    return (
      <>
        <Header />
        <div className="checkout-page-container">
          <div className="order-success-container">
            <div className="success-icon">✓</div>
            <h1 className="order-success-heading">Order Confirmed!</h1>
            <p className="success-message">
              Thank you for your order. Your order has been placed successfully.
            </p>

            <div className="order-confirmation-card">
              <p className="order-id">
                Order ID: <strong>{orderDetails.orderId}</strong>
              </p>
              <p className="order-date">
                Ordered on: <strong>{orderDetails.orderDate}</strong>
              </p>

              <div className="order-items-summary">
                <h3>Order Summary</h3>
                {orderDetails.items.map(item => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.title} x {item.quantity}</span>
                    <span>Rs {item.price * item.quantity}/-</span>
                  </div>
                ))}
                <hr />
                <div className="order-amount-row">
                  <span>Subtotal:</span>
                  <span>Rs {orderDetails.subtotal}/-</span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="order-discount-row">
                    <span>
                      Discount ({orderDetails.appliedCoupon}):
                    </span>
                    <span>-Rs {orderDetails.discount}/-</span>
                  </div>
                )}
                <div className="order-tax-row">
                  <span>Tax (5%):</span>
                  <span>Rs {orderDetails.tax}/-</span>
                </div>
                <div className="order-total-row">
                  <span>Total:</span>
                  <span>Rs {orderDetails.total}/-</span>
                </div>
              </div>

              <div className="shipping-address-section">
                <h3>Shipping Address</h3>
                <p>{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} -
                  {' '}
                  {orderDetails.shippingAddress.pincode}
                </p>
                <p>Email: {orderDetails.shippingAddress.email}</p>
                <p>Phone: {orderDetails.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="success-action-buttons">
              <button
                type="button"
                className="button orders-button"
                onClick={() => navigate('/orders')}
              >
                View Orders
              </button>
              <button
                type="button"
                className="button continue-button"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="checkout-page-container">
        <h1 className="checkout-heading">Checkout</h1>

        <div className="checkout-wrapper">
          {/* Left section - Address & Form */}
          <div className="checkout-form-section">
            {/* Saved Addresses */}
            {savedAddresses.length > 0 && (
              <div className="form-card saved-addresses-card">
                <h2 className="form-section-heading">Saved Addresses</h2>
                <div className="saved-addresses-list">
                  {savedAddresses.map(addr => (
                    <div
                      key={addr.id}
                      className={`saved-address-item ${
                        selectedAddressId === addr.id ? 'selected' : ''
                      }`}
                    >
                      <div className="address-radio">
                        <input
                          type="radio"
                          name="savedAddress"
                          id={`addr-${addr.id}`}
                          checked={selectedAddressId === addr.id}
                          onChange={() => handleSelectAddress(addr)}
                        />
                        <label htmlFor={`addr-${addr.id}`} className="radio-label">
                          <div className="address-preview">
                            <p className="address-name">
                              {addr.firstName} {addr.lastName}
                            </p>
                            <p className="address-text">{addr.address}</p>
                            <p className="address-text">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="address-text">📞 {addr.phone}</p>
                          </div>
                        </label>
                      </div>
                      <button
                        type="button"
                        className="delete-address-btn"
                        onClick={() => handleDeleteAddress(addr.id)}
                        title="Delete address"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="add-new-address-btn"
                  onClick={handleAddNewAddress}
                >
                  + Add New Address
                </button>
              </div>
            )}

            {/* Address Form */}
            {showAddressForm && (
              <div className="form-card">
                <h2 className="form-section-heading">
                  {savedAddresses.length > 0 ? 'Add New Address' : 'Shipping Address'}
                </h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={formErrors.firstName ? 'input-error' : ''}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <span className="error-text">{formErrors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={formErrors.lastName ? 'input-error' : ''}
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <span className="error-text">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'input-error' : ''}
                    placeholder="Enter email address"
                  />
                  {formErrors.email && (
                    <span className="error-text">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? 'input-error' : ''}
                    placeholder="Enter 10-digit phone number"
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? 'input-error' : ''}
                  placeholder="Enter street address"
                />
                {formErrors.address && (
                  <span className="error-text">{formErrors.address}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? 'input-error' : ''}
                    placeholder="Enter city"
                  />
                  {formErrors.city && (
                    <span className="error-text">{formErrors.city}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={formErrors.state ? 'input-error' : ''}
                    placeholder="Enter state"
                  />
                  {formErrors.state && (
                    <span className="error-text">{formErrors.state}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={formErrors.pincode ? 'input-error' : ''}
                    placeholder="Enter 6-digit pincode"
                  />
                  {formErrors.pincode && (
                    <span className="error-text">{formErrors.pincode}</span>
                  )}
                </div>
              </div>

              {/* Save Address Checkbox */}
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={saveAddress}
                  onChange={e => setSaveAddress(e.target.checked)}
                />
                <label htmlFor="saveAddress" className="checkbox-label">
                  Save this address for next time
                </label>
              </div>
            </div>
            )}

            {/* Coupon section */}
            <div className="form-card coupon-section">
              <h2 className="form-section-heading">Coupon Code</h2>
              <p className="coupon-info">
                Available codes: FIRST50 (10%), SAVE20 (20%), PROMO30 (30%), FLAT500 (Flat Rs 500)
              </p>

              <div className="coupon-input-group">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  disabled={appliedCoupon !== null}
                  className="coupon-input"
                />
                {!appliedCoupon && (
                  <button
                    type="button"
                    className="coupon-button"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                )}
              </div>

              {appliedCoupon && (
                <div className="applied-coupon-badge">
                  <span>
                    ✓ Coupon {appliedCoupon.code} applied
                    {appliedCoupon.discountPercent
                      ? ` (${appliedCoupon.discountPercent}% off)`
                      : ` (Flat Rs ${appliedCoupon.discountAmount} off)`}
                  </span>
                  <button
                    type="button"
                    className="remove-coupon-btn"
                    onClick={handleRemoveCoupon}
                  >
                    ✕
                  </button>
                </div>
              )}

              {couponError && <span className="error-text">{couponError}</span>}
            </div>
          </div>

          {/* Right section - Order Summary */}
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2 className="summary-heading">Order Summary</h2>

              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.title}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-amount">Rs {item.price * item.quantity}/-</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>Rs {calculateSubtotal()}/-</span>
                </div>

                {appliedCoupon && calculateDiscount() > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span>-Rs {calculateDiscount()}/-</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Tax (5%):</span>
                  <span>Rs {calculateTax()}/-</span>
                </div>

                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>Rs {calculateTotal()}/-</span>
                </div>
              </div>

              <button
                type="button"
                className="button place-order-button"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
