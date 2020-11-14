import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Background,
  Login,
  Signup,
  UserHome,
  HomePage,
  SingleProduct,
  AllProducts
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route
          path="/login"
          render={props => (
            <div>
              <Background />
              <Login />
            </div>
          )}
        />
        <Route
          path="/signup"
          render={props => (
            <div>
              <Background />
              <Signup />
            </div>
          )}
        />
        <Route
          path="/products/:singleProductId"
          render={props => (
            <div>
              <Background />
              <SingleProduct />
            </div>
          )}
        />
        <Route
          path="/products"
          render={props => (
            <div>
              <Background />
              <AllProducts />
            </div>
          )}
          exact
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our HomePage component as a fallback */}
        <Route
          render={props => (
            <div>
              <Background />
              <HomePage />
            </div>
          )}
        />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
