import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class HomePage extends Component {
  render() {
    return (
      <div id="homeContainer">
        <div id="textBox">
          <h1 id="titleText">Tomorrow's Tech, Available Today.</h1>
          <p id="paragraphText">
            Push past the boundaries of your being and extend your abilities
            past the limits of your imagination. <br />
            Since the year 3000 Cybergrace has been the premier technology
            supplier to more than 200 galaxies.
            <br />Our unprecedented computing technologies chart a path to a
            better future, for you and for our world.
            <p>Starting today, your life will be yours again</p>
          </p>
          <p> </p>

          <Link id="browseButton" to="/products">
            Browse
          </Link>
        </div>
      </div>
    )
  }
}
