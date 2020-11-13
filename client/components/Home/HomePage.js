import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class HomePage extends Component {
  render() {
    return (
      <div id="homeContainer">
        <div id="textBox">
          <h1 id="titleText">Tomorrow's Tech, Avaiable Today.</h1>
          <p id="paragraphText">
            This is a paragraph. But wait, this is a paragraph. And in case you
            forgot, this is a paragraph. Paragraphs are life. Best paragraph
            ever. This is a paragraph. But wait, this is a paragraph. And in
            case you forgot, this is a paragraph. Paragraphs are life. Best
            paragraph ever.
          </p>
          <Link id="browseButton" to="/products">
            Browse
          </Link>
        </div>
      </div>
    )
  }
}
