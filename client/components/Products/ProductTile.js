import React from 'react'

export default function ProductTile(props) {
  const {imageUrl, name, price, description} = props
  return (
    <div className="product-tile">
      <img src={imageUrl} />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <h3 className="product-price">${price / 100}</h3>
    </div>
  )
}
