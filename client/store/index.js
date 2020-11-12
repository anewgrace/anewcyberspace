import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import singleProductReducer from './singleProduct'
import allProductsReducer from './allProducts'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const reducer = combineReducers({
  singleProduct: singleProductReducer,
  user: userReducer,
  allProducts: allProductsReducer
})

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleProduct'
