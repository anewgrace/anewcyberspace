import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromDb} from '../../store/allProducts'
import ProductTile from './ProductTile'

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
              return <ProductTile key={product.id} {...product} />
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
