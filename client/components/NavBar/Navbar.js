import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Navbar = ({handleClick, isLoggedIn}) => {
  console.log('RERENDERED!')
  return (
    <div id="navBar">
      {window.location.href.split('/')[3] === 'products' &&
      window.location.href.split('/')[4] ? (
        <div />
      ) : (
        <Link to="/home">
          <img id="logo" src="/Images/CybergraceLogo.png" />
        </Link>
      )}
      <div id="navButtons">
        {isLoggedIn ? (
          <div id="userItems">
            {/* The navbar will show these links after you log in */}
            <a id="logoutButton" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="guestItems">
            {/* The navbar will show these links before you log in */}
            <Link id="cartButton" to="/cart">
              <h3 id="cartCount">0</h3>
              <img id="cartIcon" src="/Images/cart.png" />
            </Link>
            <Link id="loginButton" to="/login">
              Login
            </Link>
            <Link id="signupButton" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
