// AllProductSection component - All products display with category, rating, and price filtering
import {useEffect, useState} from 'react'
import {TailSpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductsHeader from '../ProductsHeader'
import ProductCard from '../ProductCard'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const AllProductsSection = () => {
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId)
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeRatingId, setActiveRatingId] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const getProducts = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      setIsLoading(true)
      setError(null)

      try {
        const jwtToken = Cookies.get('jwt_token')
        if (!jwtToken) {
          throw new Error('Token missing')
        }

        const queryParameters = [
          `sort_by=${activeOptionId}`,
          activeCategoryId ? `category=${activeCategoryId}` : null,
          activeRatingId ? `rating=${activeRatingId}` : null,
          searchQuery ? `title_search=${searchQuery}` : null,
        ]
          .filter(Boolean)
          .join('&')

        const apiUrl = `https://apis.ccbp.in/products?${queryParameters}`

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        const updatedData = data.products.map(product => ({
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          imageUrl: product.image_url,
          rating: product.rating,
        }))

        setProductsList(updatedData)
        setApiStatus(apiStatusConstants.success)
      } catch (err) {
        setError(err.message)
        setApiStatus(apiStatusConstants.failure)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [activeOptionId, activeCategoryId, activeRatingId, searchQuery])

  const clearFilters = () => {
    setActiveCategoryId('')
    setSearchInput('')
    setSearchQuery('')
    setActiveRatingId('')
  }

  const changeSortby = optionId => {
    setActiveOptionId(optionId)
  }

  const changeCategory = categoryId => {
    setActiveCategoryId(categoryId)
  }

  const changeRating = ratingId => {
    setActiveRatingId(ratingId)
  }

  const changeSearchInput = value => {
    setSearchInput(value)
  }

  const enterSearchInput = value => {
  setSearchQuery(value ?? searchInput)
}

  const renderLoader = () => (
    <div className="products-loader-container">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        visible={isLoading}
      />
    </div>
  )

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button type="button" className="retry-button" onClick={clearFilters}>
        Reload Filters
      </button>
    </div>
  )

  const renderNoProductsView = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        className="no-products-img"
        alt="no products"
      />
      <h1 className="no-products-heading">No Products Found</h1>
      <p className="no-products-description">
        We could not find any products. Try changing the search or filter options.
      </p>
    </div>
  )

  const renderProductsList = () => (
    <>
      <ProductsHeader
        sortbyOptions={sortbyOptions}
        activeOptionId={activeOptionId}
        changeSortby={changeSortby}
      />
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  )

  const renderProductsContent = () => {
    if (isLoading) {
      return renderLoader()
    }

    if (apiStatus === apiStatusConstants.failure) {
      return renderFailureView()
    }

    if (productsList.length === 0) {
      return renderNoProductsView()
    }

    return renderProductsList()
  }

  return (
    <div className="all-products-section">
      <aside className="filters-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={changeSearchInput}
          enterSearchInput={enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={changeCategory}
          changeRating={changeRating}
          clearFilters={clearFilters}
        />
      </aside>
      <main className="products-section">
        {renderProductsContent()}
      </main>
    </div>
  )
}

export default AllProductsSection