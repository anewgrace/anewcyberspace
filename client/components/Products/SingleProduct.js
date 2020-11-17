import React, {Component} from 'react'
import {connect} from 'react-redux'
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
    if (this.props.isLogged) {
      //MAX's CODE
    } else {
      this.setState({loading: true}, () => {
        addProductToGuestCart(this.props.singleProduct, this.state.quantity)
        this.setState({loading: false})
      })
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
    let optionTags = []
    for (let i = 1; i < 100; i++) {
      optionTags.push(i)
    }
    let currentQuantity = 1
    let item = JSON.parse(
      global.localStorage.getItem(this.props.singleProduct.id)
    )
    if (this.props.singleProduct && item && item.quantity)
      currentQuantity = item.quantity
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
                {optionTags.map((tag, idx) => {
                  if (tag === currentQuantity) {
                    return (
                      <option key={idx} value={tag} selected>
                        {tag.toString()}
                      </option>
                    )
                  } else {
                    return (
                      <option key={idx} value={tag}>
                        {tag.toString()}
                      </option>
                    )
                  }
                })}
              </select>
              {item ? (
                <button id="addToCart" onClick={() => this.addProductToCart()}>
                  Update Cart
                </button>
              ) : (
                <button id="addToCart" onClick={() => this.addProductToCart()}>
                  Add To Cart
                </button>
              )}
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
    dispatch(getSingleProductFromDb(singleProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
