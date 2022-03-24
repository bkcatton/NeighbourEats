import React from 'react'

const DishDetails = props => {
  
  const {
    title,
    dish_description,
    image_link,
    price_cents,
    country_style,
    serving_size
  } = props.dishDetails
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{dish_description}</p>
      <p>{serving_size}</p>
      <p>{country_style}</p>
      <p>{price_cents}</p>
      <img src={image_link} alt={title} style={{maxWidth: "400px"}}/>
    </div>
  )
}

export default DishDetails
