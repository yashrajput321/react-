// PrimeDealsSection component - Featured/special deals section with discounted products
import {useEffect, useState} from 'react'
import {TailSpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import Cheems from '../../assets/prime-cheems.png';
import './index.css'

const PrimeDealsSection = () => {
    // API fetch status flags used to choose what to render
    const apiStatusConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

  // Local component state
  const [dealsList, setDealsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.intial) ;

  useEffect(() => {
    // Fetch prime deals when the component mounts
    const getDeals = async () => {
      try {
        setIsLoading(true)
        setApiStatus(apiStatusConstants.inProgress)

        const jwtToken = Cookies.get('jwt_token')

        // If the token is missing, fail early
        if (!jwtToken) {
            setApiStatus(apiStatusConstants.failure)
          throw new Error('Token missing')
          
        }

        const response = await fetch('https://apis.ccbp.in/prime-deals', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        if (!response.ok) {
            setApiStatus(apiStatusConstants.failure)
          throw new Error('Failed to fetch')
        }

        const data = await response.json()

        // Transform API payload into the shape expected by ProductCard
        const updatedData = data.prime_deals.map(deal => ({
          title: deal.title,
          brand: deal.brand,
          price: deal.price,
          id: deal.id,
          imageUrl: deal.image_url,
          rating: deal.rating,
        }))
        
        setDealsList(updatedData)
        setApiStatus(apiStatusConstants.success)
      } catch (err) {
        setError(err.message)
        setApiStatus(apiStatusConstants.failure)
      } finally {
        setIsLoading(false)
      }
    }

    getDeals()
  }, [])

  // Render success view when deals are available
  const renderDealsList = () => (
    <div className="products-list-container" >
      <h1 className="primedeals-list-heading" >Prime Deals</h1>
      <ul className="products-list">
        {dealsList.map(deal => (
          <ProductCard productData={deal} key={deal.id} />
        ))}
      </ul>
    </div>
  )

  // Fallback image shown when the deals API fails
  const renderPrimeDealsFailureView = () => (
    <img
      src={Cheems}
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  // Loading indicator while fetch is in progress
  const renderLoadingView = () => (
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


  switch (apiStatus) {
    case apiStatusConstants.success:
        return renderDealsList()
    case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
    case apiStatusConstants.inProgress:
        return renderLoadingView()
    default:
        return null ;
  }
}

export default PrimeDealsSection;