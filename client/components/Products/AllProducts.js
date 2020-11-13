import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromDb} from '../../store/allProducts'
import ProductTile from './ProductTile'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    console.log('products props:', this.props)
    this.setState({loading: true}, () => {
      this.props.loadProducts().then(() => {
        this.setState({loading: false})
      })
    })
  }
  render() {
    return (
      <div className="allProducts">
        {this.state.loading ? (
          <div id="loading" />
        ) : (
          <div className="container">
            {this.props.allProducts.map(product => {
              let singleProductLink = `/products/${product.id}`
              return (
                <Link
                  id="productTileLink"
                  key={product.id}
                  to={singleProductLink}
                >
                  <ProductTile {...product} />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.allProducts
})

const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(getProductsFromDb())
})

export default connect(mapState, mapDispatch)(AllProducts)
