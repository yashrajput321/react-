// ProductItemDetails component - Detailed product view with API fetching, quantity controls, and add to cart
import {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductItemDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [productData, setProductData] = useState({})
  const [similarProductsData, setSimilarProductsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    brand: data.brand,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
    price: data.price,
    description: data.description,
  })

  const getProductData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      setProductData(getFormattedData(fetchedData))
      setSimilarProductsData(
        fetchedData.similar_products.map(each =>
          getFormattedData(each),
        ),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductData()
    setIsAddedToCart(false)
    setQuantity(1)
  }, [id])

  const onDecrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : prev))
  }

  const onIncrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const getCartItems = () => {
    const storedCart = localStorage.getItem('cheems_cart')
    return storedCart ? JSON.parse(storedCart) : []
  }

  const saveCartItems = items => {
    localStorage.setItem('cheems_cart', JSON.stringify(items))
  }

  const onAddToCart = () => {
    if (isAddedToCart) {
      navigate('/cart')
      return
    }

    const currentCart = getCartItems()
    const existingProductIndex = currentCart.findIndex(item => item.id === productData.id)

    if (existingProductIndex >= 0) {
      currentCart[existingProductIndex].quantity += quantity
    } else {
      const newCartItem = {
        id: productData.id,
        title: productData.title,
        brand: productData.brand,
        price: productData.price,
        imageUrl: productData.imageUrl,
        rating: productData.rating,
        quantity,
      }
      currentCart.push(newCartItem)
    }

    saveCartItems(currentCart)
    setIsAddedToCart(true)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
    }, 2000)
  }

  const renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loader" visible />
    </div>
  )

  const renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const renderSuccessView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>

            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>

            <p>{description}</p>

            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>

            <div className="quantity-container">
              <button onClick={onDecrementQuantity}>
                <BsDashSquare />
              </button>
              <p>{quantity}</p>
              <button onClick={onIncrementQuantity}>
                <BsPlusSquare />
              </button>
            </div>

            <button className="button add-to-cart-btn" onClick={onAddToCart}>
              {isAddedToCart ? 'GO TO CART' : 'ADD TO CART'}
            </button>
            {showSuccess && (
              <div className="success-notification">
                ✓ Added to cart successfully!
              </div>
            )}
          </div>
        </div>

        <h1>Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(product => (
            <SimilarProductItem
              key={product.id}
              productDetails={product}
            />
          ))}
        </ul>
      </div>
    )
  }

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="product-details-page">
        <div className="product-details-topbar">
          <Link to="/products" className="back-link">
            Back to Products
          </Link>
        </div>
        {renderProductDetails()}
      </div>
    </>
  )
}

export default ProductItemDetails
