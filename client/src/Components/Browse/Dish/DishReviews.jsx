import React from 'react'

const DishReviews = props => {
  const reviewsList = props.dishReviews.map((item)=>{
    
    return (
      <div key={item.id}>{item.content} {item.full_name} {item.star_rating}</div>
    )
  })

  return (
    <div>{reviewsList}</div>
  )
}

export default DishReviews