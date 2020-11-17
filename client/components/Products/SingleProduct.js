import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addOrderItemToCart, me} from '../../store'
import {
  getSingleProductFromDb,
  addProductToGuestCart
} from '../../store/singleProduct'
import ProductTile from './ProductTile'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      quantity: 1
    }
    this.addProductToCart = this.addProductToCart.bind(this)
  }

  handleQuantityChange = event => {
    this.setState({quantity: event.target.value})
  }

  addProductToCart = () => {
    if (this.props.isLoggedIn) {
      this.props.sendOrderItem(this.props.singleProduct)
    } else {
      console.log('NOT LOGGED IN')
      addProductToGuestCart(this.props.singleProduct, this.state.quantity)
    }
  }

  componentDidMount() {
    this.setState({loading: true}, () => {
      this.props
        .getSingleProductFromDb(window.location.href.split('/')[4])
        .then(() => {
          this.setState({loading: false})
        })
    })
  }

  render() {
    return (
      <div id="singleProductContainer">
        {this.state.loading ? (
          <h1 id="loading">Loading...</h1>
        ) : (
          <div>
            <img
              id="productImage"
              src={'../' + this.props.singleProduct.imageUrl}
            />
            <h1 id="productName">{this.props.singleProduct.name}</h1>
            <h3 id="productPrice">
              {'$' + (this.props.singleProduct.price / 100).toLocaleString()}
            </h3>
            <p id="productDescription">
              {this.props.singleProduct.description}
            </p>
            <div id="interactions">
              <select
                id="chooseQuantity"
                name="quantity"
                onChange={() => this.handleQuantityChange(event)}
              >
                <option value={1} selected>
                  1
                </option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <button id="addToCart" onClick={() => this.addProductToCart()}>
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProductFromDb: singleProductId =>
    dispatch(getSingleProductFromDb(singleProductId)),
  sendOrderItem: orderItem => dispatch(addOrderItemToCart(orderItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
