import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allUsersReducer from './allUsers'
import singleProductReducer from './singleProduct'
import allProductsReducer from './allProducts'
import userReducer from './user'
import orderReducer from './order'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const reducer = combineReducers({
  singleProduct: singleProductReducer,
  allUsers: allUsersReducer,
  allProducts: allProductsReducer,
  user: userReducer,
  cart: orderReducer
})

const store = createStore(reducer, middleware)

export default store
export * from './allUsers'
export * from './singleProduct'
export * from './user'
export * from './order'
