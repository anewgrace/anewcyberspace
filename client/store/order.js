import axios from 'axios'
//-------------ACTION TYPES----------------
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const SET_CART = 'SET_CART'
//-------------ACTION CREATORS----------------
const addOrderItem = orderItem => ({
  type: ADD_ORDER_ITEM,
  orderItem
})
const setCart = cart => ({
  type: SET_CART,
  cart
})
//-------------THUNKS----------------
export function addOrderItemToCart(orderItem) {
  return async dispatch => {
    try {
      await axios.post('/api/cart/:orderItemId', orderItem)
      dispatch(addOrderItem(orderItem))
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

//-------------REDUCER----------------
export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return {...state, orderItem: [...state.orderItem, action.orderItem]}
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
