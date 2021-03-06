import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {mergeCarts} from '../../store/order'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="userFormContainer">
      <h1 id="formTitleText">{displayName}</h1>
      <form onSubmit={handleSubmit} name={name} id="userForm">
        <div id="emailContainer">
          <input
            id="emailInput"
            name="email"
            type="text"
            placeholder="Email..."
          />
        </div>
        <div id="passwordContainer">
          <input
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Password..."
          />
        </div>
        <div id="submitContainer">
          <button id="submitButton" type="submit">
            {displayName}
          </button>
        </div>
        {error &&
          error.response && (
            <div id="errorResponse"> {error.response.data} </div>
          )}
      </form>
      <a id="googleLink" href="/auth/google">
        {displayName} with Google
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName)).then(() => {
        const items = Object.values(window.localStorage)
        let newItemArray = items.map(item => {
          return JSON.parse(item)
        })
        dispatch(mergeCarts(newItemArray)).then(() => {
          window.localStorage.clear()
        })
      })
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
