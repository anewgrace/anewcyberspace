import React from 'react'
import {Link} from 'react-router-dom'

export default function Success({success}) {
  return (
    <div id="successContainer">
      {success ? (
        <h1 id="success">Success!</h1>
      ) : (
        <h1 id="success">Not Authorized!</h1>
      )}

      <Link id="successLink" to="/home">
        <button id="successButton">Return to Home</button>
      </Link>
    </div>
  )
}
