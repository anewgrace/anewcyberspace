import axios from 'axios'
//-------------ACTION TYPES----------------
const ADD_SINGLE_ITEM = 'ADD_ORDER_ITEM'
const SET_CART = 'SET_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
//-------------ACTION CREATORS----------------
const addSingleItem = singleItem => ({
  type: ADD_SINGLE_ITEM,
  singleItem
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
export function addSingleItemToCart(singleItem, foundItem, quantity) {
  return async dispatch => {
    try {
      if (foundItem[0]) {
        foundItem[1].quantity = quantity
        dispatch(putCartItem(foundItem[1]))
      } else {
        const {data: created} = await axios.post('/api/cart/', singleItem)
        dispatch(addSingleItem(created))
      }
    } catch (error) {
      console.log('ERROR IN ORDER THUNK:', error)
    }
  }
}

export function findOrderItem(singleProduct) {
  return async dispatch => {
    try {
      const cart = await axios.get('/api/cart')
      let orderItemsArray = cart.data.OrderItems
      let foundItem = [false, {}]
      orderItemsArray.map(orderItem => {
        if (orderItem.productId === singleProduct.id) {
          console.log('orderItem', orderItem)
          foundItem[0] = true
          foundItem[1] = orderItem
        }
      })
      console.log('Found item before return', foundItem)
      return foundItem
    } catch (error) {
      console.log('ERROR IN FIND ITEM THUNK:', error)
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
  console.log('THIS WAS HIT', cartItem.id)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${cartItem.id}`, {
        quantity: cartItem.quantity
      })
      console.log('DATA', data)
      console.log('data (returns 1 if updated successfully)', data[0])
      data[0] && dispatch(updateCartItem(cartItem))
    } catch (error) {
      console.log('ERROR IN UPDATE CART THUNK:', error)
    }
  }
}
//param cartItem is an object containing cartItem ID and Quantity
export function deleteCartItem(cartItem) {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${cartItem.id}`)
      console.log('data (returns 1 if deleted successfully)', data)
      data === 1 && dispatch(removeCartItem(cartItem))
    } catch (error) {
      console.log('ERROR IN DELETE CART THUNK:', error)
    }
  }
}

export function mergeCarts(orderItems) {
  return async dispatch => {
    const {data} = await axios.post(`/api/cart/merge`, {orderItems})
    return data
  }
}

export function completeOrder(orderId) {
  return async dispatch => {
    const {data} = await axios.put(`/api/cart`, {orderId})
    return data[0]
  }
}

//-------------REDUCER----------------
export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case ADD_SINGLE_ITEM:
      console.log('state', state)
      console.log('state.OrderItems', state.singleItem)
      console.log('expected return', {
        ...state,
        OrderItems: [...state.OrderItems, action.singleItem]
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
          item => action.cartItem.id !== item.id
        ),
        updatedAt: Date.now()
      }
    default:
      return state
  }
}
