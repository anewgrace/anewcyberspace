import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div id="navBar">
      {window.location.href.split('/')[3] === 'products' &&
      window.location.href.split('/')[4] ? (
        <Link id="backLink" to="/products">
          <h1 id="backToProducts">← Back</h1>
        </Link>
      ) : (
        <div>
          {window.location.href.split('/')[3] === 'confirmation' ? (
            <Link id="backLink" to="/cart">
              <h1 id="backToProducts">← Back</h1>
            </Link>
          ) : (
            <Link to="/home">
              <img id="logo" src="/Images/CybergraceLogo.png" />
            </Link>
          )}
        </div>
      )}
      <div id="navButtons">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {isAdmin ? (
              <div id="userItems" style={{right: '0px'}}>
                <Link id="cartButton" to="/cart">
                  <img id="cartIcon" src="/Images/cart.png" />
                </Link>
                <a id="logoutButton" href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link id="dashboardButton" to="/dashboard">
                  Dashboard
                </Link>
              </div>
            ) : (
              <div id="userItems" style={{right: '-100px'}}>
                <Link id="cartButton" to="/cart">
                  <img id="cartIcon" src="/Images/cart.png" />
                </Link>
                <a id="logoutButton" href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <div id="guestItems">
            {/* The navbar will show these links before you log in */}
            <Link id="cartButton" to="/cart">
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
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin'
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
