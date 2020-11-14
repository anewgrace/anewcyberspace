import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../../store'

/**
 * COMPONENT
 */
const Login = ({handleSubmit}) => {
  return (
    <div id="userForm">
      <form onSubmit={handleSubmit} name="login">
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
          <button type="submit">Log In</button>
        </div>
        {/*error && error.response && <div> {error.response.data} </div>*/}
      </form>
      <a href="/auth/google">Log in with Google</a>
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

export default connect(null, mapDispatch)(Login)
