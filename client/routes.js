import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Background,
  Navbar,
  Login,
  Signup,
  UserHome,
  HomePage,
  SingleProduct,
  AllProducts,
  CartPage,
  Confirmation
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
      <div>
        <Background />
        <Route component={Navbar} />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/products/:singleProductId"
            component={() => <SingleProduct isLoggedIn={isLoggedIn} />}
          />
          <Route exact path="/products" component={AllProducts} />
          <Route
            exact
            path="/cart"
            component={() => <CartPage isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/confirmation"
            component={() => <Confirmation isLoggedIn={isLoggedIn} />}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={HomePage} />
            </Switch>
          )}
          {/* Displays our HomePage component as a fallback */}
          <Route component={HomePage} />
        </Switch>
      </div>
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
