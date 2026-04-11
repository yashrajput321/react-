import {useEffect, useState} from 'react'
import { ThreeDots,Audio,TailSpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

const AllProductsSection = () => {
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true)

        const jwtToken = Cookies.get('jwt_token')

        if (!jwtToken) {
          throw new Error('Token missing')
        }

        const response = await fetch('https://apis.ccbp.in/products', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data = await response.json()

        const updatedData = data.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))

        setProductsList(updatedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  const renderProductsList = () => (
    <>
      <h1 className="products-heading">All Products</h1>
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  )

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

  if (isLoading) return renderLoader()
  if (error) return <p>Error: {error}</p>

  return renderProductsList()
}


export default AllProductsSection