import React from "react";

export default function Card({id, name, brand, price, img, description, stock, status, categoryId, categoryName}) {
  return (
    <div key={id}>
      <h2>{name}</h2>
      <img src={img}/>
      <h3>{brand}</h3>
      <h4>{`$${price}`}</h4>
      <h4>{`${status}`}</h4>
      <br></br>
      <h4>{`${categoryName}`}</h4>
      <h4>{`Stock: ${stock}`}</h4>
      <br></br>
      <br></br>
    </div>
  )
}