import axios from 'axios'
//-------------ACTION TYPES----------------
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'
//-------------ACTION CREATORS----------------
const addOrderItem = orderItem => ({
  type: ADD_ORDER_ITEM,
  orderItem
})
const getOrderItemsFromOrder = orderItems => ({
  type: GET_ORDER_ITEMS,
  orderItems
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

export function retriveOrderItemsFromOrder() {
  return async dispatch => {
    try {
      const response = await axios.get('/api/cart')
      const orderItems = response.data
      dispatch(getOrderItemsFromOrder(orderItems))
    } catch (error) {
      console.log('ERROR IN ORDER RETRIEVAL THUNK:', error)
    }
  }
}

//-------------REDUCER----------------
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return [...state, action.orderItem]
    case GET_ORDER_ITEMS:
      return [...state, action.orderItems]
    default:
      return state
  }
}
