import {session} from 'passport'
import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {getCartItems} from '../../store/cartItems'

export class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      cartItems: []
    }
  }

  componentDidMount() {
    /*
    if(!session.userId) {    <-- USER EXISTS (NEED TO MAKE THIS CORRECT), GET ROUTE!!
      this.setState({loading: true}, () => {
        getCartItems(orderId).then((items) => {
          this.setState({cartItems: items});
        })
      })
    }
    */

    //else {     <-- USER DOESN'T EXIST, LOCAL STORAGE!!
    const items = Object.values(global.localStorage)
    console.log(items)
    this.setState({cartItems: items, loading: false})
    //}
  }

  render() {
    return (
      <div id="cartContainer">
        {this.state.cartItems && this.state.cartItems.length ? (
          <div id="itemsContainer">
            {this.state.cartItems.map((item, idx) => {
              if (item) {
                return (
                  <div key={idx} id="cartItemTest">
                    {JSON.parse(item).name}
                  </div>
                )
              }
            })}
          </div>
        ) : (
          <div id="emptyCart" />
        )}
      </div>
    )
  }
}

/*
const mapStateToProps = state => ({
  //cartItems: state.cartItems,
})

const mapDispatchToProps = dispatch => ({
  //getCartItems = (cartId) => dispatch(getCartItems(cartId)),
})
*/

export default CartPage
