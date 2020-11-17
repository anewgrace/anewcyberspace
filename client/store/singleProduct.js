import axios from 'axios'
import {SingleProduct} from '../components'
import ProductTile from '../components/Products/ProductTile'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

const initialState = {}

const setSingleProductState = singleProduct => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct
})

export function getSingleProductFromDb(singleProductId) {
  return dispatch => {
    return axios
      .get(`/api/products/${singleProductId}`)
      .then(response => {
        dispatch(setSingleProductState(response.data))
      })
      .catch(error => {
        console.log(error)
        return -1
      })
  }
}

export function addProductToGuestCart(singleProduct, quantity) {
  let cartItem = JSON.parse(global.localStorage.getItem(singleProduct.id))
  if (cartItem) {
    cartItem.quantity += parseInt(quantity)
  } else {
    cartItem = {
      name: singleProduct.name,
      description: singleProduct.description,
      price: singleProduct.price,
      imageUrl: singleProduct.imageUrl,
      quantity: parseInt(quantity)
    }
  }
  global.localStorage.setItem(singleProduct.id, JSON.stringify(cartItem))
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
