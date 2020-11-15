import axios from 'axios'
//-------------ACTION TYPES----------------
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
//-------------ACTION CREATORS----------------
const addOrderItem = orderItem => ({
  type: ADD_ORDER_ITEM,
  orderItem
})
//-------------THUNKS----------------
export function addOrderItemToUserOrder(orderItem) {
  return async dispatch => {
    try {
      await axios.post('/api/cart', orderItem)
      dispatch(addOrderItem(orderItem))
    } catch (error) {
      console.log('ERROR IN ORDER THUNK:', error)
    }
  }
}
//-------------REDUCER----------------
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return [...state, action.orderItem]
    default:
      return state
  }
}

//get all cartitems in cart is next!
