import React from 'react'
import {Link} from 'react-router-dom'

export default function Success() {
  return (
    <div id="successContainer">
      <h1 id="success">Success!</h1>
      <Link id="successLink" to="/home">
        <button id="successButton">Return to Home</button>
      </Link>
    </div>
  )
}
