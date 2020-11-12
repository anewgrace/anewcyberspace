import axios from 'axios'
//-------------ACTION TYPES----------------
const SET_PRODUCTS = 'SET_PRODUCTS'
//-------------ACTION CREATORS----------------
const setProductsState = products => ({
  type: SET_PRODUCTS,
  products
})
//-------------THUNKS----------------
export function getProductsFromDb() {
  return async dispatch => {
    try {
      let {data: products} = await axios.get('/api/products')
      dispatch(setProductsState(products))
    } catch (error) {
      console.log('ERROR IN ALLPRODUCTS THUNK:', error)
    }
  }
}
//-------------REDUCER----------------
export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
}
