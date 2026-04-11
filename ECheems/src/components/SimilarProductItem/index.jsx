import './index.css'
import ProductCard from '../ProductCard'

const SimilarProductItem = props => {
  const {productDetails} = props

  return (
    <ProductCard productData={productDetails} key={productDetails.id} />
  )
}

export default SimilarProductItem
