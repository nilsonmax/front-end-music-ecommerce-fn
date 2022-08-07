import React from "react";
import { Link } from "react-router-dom";
import { StyledCard, StyledButton } from "./style";
import { BsCart3 } from "react-icons/bs";


export default function Card({id, name, brand, price, img, description, stock, status, categoryId, categoryName}) {
  return (
    <Link to={"/instruments/"+id} key={id}>
      <br></br>
      <StyledCard>
        <img src={img}/>
        <h2>{name}</h2>
        <h2>{`$${price}`}</h2>
        <p>{`${description.slice(0, 50)}...`}</p>
        <b>{`Stock:`}</b> <span>{`${stock}`}</span>
        <b>{`Type:`}</b> <span>{`${categoryName}`}</span>
        <h3>{brand}</h3>
        <h3>{`${status}`}</h3>
        <StyledButton><BsCart3/></StyledButton>
        <br></br>

      </StyledCard>
    </Link>
  )
}