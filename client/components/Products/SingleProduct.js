import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductFromDb} from '../../store/singleProduct'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true}, () => {
      this.props
        .getSingleProductFromDb(window.location.href.split('/')[4])
        .then(() => {
          this.setState({loading: false})
        })
    })
  }

  render() {
    return (
      <div id="singleProductContainer">
        {this.state.loading ? (
          <h1 id="loading">Loading...</h1>
        ) : (
          <h1 id="singleProductItem">
            <button id="addToCart">Add To Cart</button>
          </h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProductFromDb: singleProductId =>
    dispatch(getSingleProductFromDb(singleProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
