import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromDb} from '../../store/allProducts'

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
            <div className="products-tile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU" />
              <h3 className="product-name">Jet Pack</h3>
              <p className="product-description">A backpack that flies</p>
              <h3 className="product-price">$233.99</h3>
            </div>
            <div className="products-tile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU" />
              <h3 className="product-name">Jet Pack</h3>
              <p className="product-description">A backpack that flies</p>
              <h3 className="product-price">$233.99</h3>
            </div>
            <div className="products-tile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU" />
              <h3 className="product-name">Jet Pack</h3>
              <p className="product-description">A backpack that flies</p>
              <h3 className="product-price">$233.99</h3>
            </div>
            <div className="products-tile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4NEG6o7-rSz8unTl2R1RYTUIuYbHTvYtGqQ&usqp=CAU" />
              <h3 className="product-name">Jet Pack</h3>
              <p className="product-description">A backpack that flies</p>
              <h3 className="product-price">$233.99</h3>
            </div>
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
