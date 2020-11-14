import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../../store'

/**
 * COMPONENT
 */
const Signup = ({handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} name="signup" id="userForm">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {/*error && error.response && <div> {error.response.data} </div>*/}
      </form>
      <a href="/auth/google">Sign Up with Google</a>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(null, mapDispatch)(Signup)
