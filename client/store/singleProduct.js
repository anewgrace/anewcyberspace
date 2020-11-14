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
  let guestCart = JSON.parse(global.localStorage.getItem('guestCart'))
  if (guestCart && guestCart[singleProduct.id]) {
    guestCart[singleProduct.id].quantity += parseInt(quantity)
  } else {
    guestCart = [...guestCart]
    let guestItem = {
      name: singleProduct.name,
      description: singleProduct.description,
      price: singleProduct.price,
      imageUrl: singleProduct.imageUrl,
      quantity: parseInt(quantity)
    }
    guestCart[singleProduct.id] = guestItem
  }
  global.localStorage.setItem('guestCart', JSON.stringify(guestCart))
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
