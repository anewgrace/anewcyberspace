import axios from 'axios'

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

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
