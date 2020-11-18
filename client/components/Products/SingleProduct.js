import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addSingleItemToCart, findOrderItem} from '../../store/order'
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
      quantity: 1,
      foundOrderItem: {}
    }
    this.addProductToCart = this.addProductToCart.bind(this)
  }

  handleQuantityChange = event => {
    this.setState({quantity: event.target.value})
  }

  addProductToCart = () => {
    if (this.props.isLoggedIn) {
      this.setState({loading: true}, () => {
        this.findItem()
        this.props.sendSingleItem(
          this.props.singleProduct,
          this.state.foundOrderItem,
          this.state.quantity
        )

        this.setState({loading: false})
      })
    } else {
      this.setState({loading: true}, () => {
        addProductToGuestCart(this.props.singleProduct, this.state.quantity)
        this.setState({loading: false})
      })
    }
  }

  findItem() {
    this.setState({loading: true}, () => {
      this.props
        .getSingleProductFromDb(window.location.href.split('/')[4])
        .then(async () => {
          let foundOrderItem = await this.props.findOrderItem(
            this.props.singleProduct
          )

          console.log(foundOrderItem)
          this.setState({foundOrderItem, loading: false})
        })
    })
  }

  componentDidMount() {
    this.findItem()
  }

  render() {
    let optionTags = []
    for (let i = 1; i < 100; i++) {
      optionTags.push(i)
    }
    let currentQuantity = 1
    let item = {}
    let itemStatus = this.state.foundOrderItem[0]
    if (this.props.isLoggedIn) {
      item = this.state.foundOrderItem[1]
    } else {
      item = JSON.parse(
        global.localStorage.getItem(this.props.singleProduct.id)
      )
    }
    if (this.props.singleProduct && item && item.quantity)
      currentQuantity = item.quantity
    return (
      <div id="singleProductContainer">
        {this.state.loading ? (
          <h1 id="loading">Loading...</h1>
        ) : (
          <div>
            <img id="productImage" src={this.props.singleProduct.imageUrl} />
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

              {!this.props.isLoggedIn && item ? (

                <button id="addToCart" onClick={() => this.addProductToCart()}>
                  Update Cart
                </button>
              ) : (
                <div>
                  {this.props.isLoggedIn && itemStatus ? (
                    <button
                      id="addToCart"
                      onClick={() => this.addProductToCart()}
                    >
                      Update Cart
                    </button>
                  ) : (
                    <button
                      id="addToCart"
                      onClick={() => this.addProductToCart()}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
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
    dispatch(getSingleProductFromDb(singleProductId)),
  sendSingleItem: (singleItem, foundItem, quantity) =>
    dispatch(addSingleItemToCart(singleItem, foundItem, quantity)),
  findOrderItem: singleItem => dispatch(findOrderItem(singleItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
