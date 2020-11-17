import {session} from 'passport'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {retrieveCart} from '../../store/order'
import {Link} from 'react-router-dom'

export class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      cartItems: [],
      userType: ''
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      this.setState({loading: true}, () => {
        retrieveCart().then(() => {
          this.setState({
            cartItems: this.props.cart.orderItems,
            userType: 'user'
          })
        })
      })
    } else {
      const items = Object.values(global.localStorage)
      this.setState({
        cartItems: items,
        loading: false,
        userType: 'guest'
      })
    }
  }

  render() {
    let totalPrice = 0
    return (
      <div id="cartContainer">
        {this.state.cartItems && this.state.cartItems.length ? (
          <div id="itemsContainer">
            {this.state.cartItems.map((item, idx) => {
              if (this.state.userType === 'guest') {
                totalPrice += JSON.parse(item).price * JSON.parse(item).quantity
                return (
                  <div key={idx} id="cartItem">
                    <button id="removeButton">+</button>
                    <h2 id="cartItemName">{JSON.parse(item).name}</h2>
                    <p id="cartItemDescription">
                      {JSON.parse(item).description}
                    </p>
                    <select
                      id="chooseQuantityCart"
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
                    <h2 id="singleItemPrice">
                      {'$' +
                        (JSON.parse(item).price / 100).toLocaleString() +
                        ' (' +
                        JSON.parse(item).quantity +
                        ')'}
                    </h2>
                    <h2 id="totalItemPrice">
                      {'Total: $' +
                        (
                          JSON.parse(item).price *
                          JSON.parse(item).quantity /
                          100
                        ).toLocaleString()}
                    </h2>
                  </div>
                )
              }
            })}
          </div>
        ) : (
          <div id="emptyCart" />
        )}
        <h2 id="totalCartPrice">
          {'Total: $' + (totalPrice / 100).toLocaleString()}
        </h2>
        <Link id="checkoutLink" to="/confirmation">
          <button id="checkoutButton">Checkout</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(retrieveCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
