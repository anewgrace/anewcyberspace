import axios from 'axios'
//-------------ACTION TYPES----------------
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const SET_CART = 'SET_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
//-------------ACTION CREATORS----------------
const addOrderItem = orderItem => ({
  type: ADD_ORDER_ITEM,
  orderItem
})
const setCart = cart => ({
  type: SET_CART,
  cart
})

const updateCartItem = cartItem => ({
  type: UPDATE_QUANTITY,
  cartItem
})

const removeCartItem = cartItem => ({
  type: REMOVE_CART_ITEM,
  cartItem
})
//-------------THUNKS----------------
export function addOrderItemToCart(singleProduct) {
  return async dispatch => {
    try {
      const {data: created} = await axios.post('/api/cart/', singleProduct)

      dispatch(addOrderItem(created))
    } catch (error) {
      console.log('ERROR IN ORDER THUNK:', error)
    }
  }
}

export function retrieveCart() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/cart')
      const cart = response.data
      dispatch(setCart(cart))
    } catch (error) {
      console.log('ERROR IN ORDER RETRIEVAL THUNK:', error)
    }
  }
}

//@param cartItem is an object containing cartItem ID and Quantity
export function putCartItem(cartItem) {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${cartItem.id}`, {
        quantity: cartItem.quantity
      })
      console.log('data (returns 1 if updated successfully)', data[0])
      data[0] && dispatch(updateCartItem(cartItem))
    } catch (error) {
      console.log('ERROR IN UPDATE CART THUNK:', error)
    }
  }
}
//@param cartItem is an object containing cartItem ID and Quantity
export function deleteCartItem(cartItem) {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${cartItem.id}`)
      console.log('data (returns 1 if deleted successfully)', data[0])
      data[0] === 1 && dispatch(removeCartItem(cartItem))
    } catch (error) {
      console.log('ERROR IN DELETE CART THUNK:', error)
    }
  }
}

//-------------REDUCER----------------
export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      console.log('state', state)
      console.log('state.OrderItems', state.OrderItems)
      console.log('expected return', {
        ...state,
        OrderItems: [...state.OrderItems, action.orderItem]
      })
      return {...state, OrderItems: [...state.OrderItems, action.orderItem]}
    case SET_CART:
      return action.cart
    case UPDATE_QUANTITY:
      return {
        ...state,
        OrderItems: state.OrderItems.map(item => {
          if (action.orderItem.id === item.id) return action.orderItem
          else return item
        })
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        OrderItems: state.OrderItems.filter(
          item => action.orderItem.id !== item.id
        )
      }
    default:
      return state
  }
}
