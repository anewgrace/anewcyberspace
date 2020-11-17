import {session} from 'passport'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {retrieveCart} from '../../store/order'
import {Link} from 'react-router-dom'

export class ConfirmationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cart: {},
      cartItems: []
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.setState({loading: true}, () => {
        this.props.retrieveCart().then(() => {
          this.setState({
            cartItems: this.props.cart.orderItems,
            loading: false
          })
        })
      })
    } else {
      const items = Object.values(global.localStorage)
      this.setState({loading: true}, () => {
        this.props.retrieveCart().then(() => {
          this.setState({
            cartItems: items,
            loading: false
          })
        })
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
              totalPrice += JSON.parse(item).price * JSON.parse(item).quantity
              let optionTags = []
              for (let i = 1; i < this.props.cart.inventory; i++) {
                optionTags.push(i)
              }
              return (
                <div key={idx} id="cartItem">
                  <button id="removeButton">+</button>
                  <img
                    id="cartItemImage"
                    src={'../' + JSON.parse(item).imageUrl}
                  />
                  <h2 id="cartItemName">{JSON.parse(item).name}</h2>
                  <p id="cartItemDescription">{JSON.parse(item).description}</p>
                  <select
                    id="chooseQuantityCart"
                    name="quantity"
                    onChange={() => this.handleQuantityChange(event)}
                  >
                    {optionTags.map((tag, idx) => {
                      if (tag === JSON.parse(item).quantity) {
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
                  {/*
                      (document.getElementById(
                        'chooseQuantityCart'
                      ).value = JSON.parse(item).quantity)
                      */}
                </div>
              )
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
  retrieveCart: () => dispatch(retrieveCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage)
