import React from "react";
import { Link } from "react-router-dom";
import { StyledCard, StyledButton } from "./style";
import { BsCart3 } from "react-icons/bs";


export default function Card({id, name, brand, price, img, description, stock, status, categoryId, categoryName}) {

  const formattedMoney = 
  price.toLocaleString('es-us', {
    style: 'currency',
    currency: 'COL'
  })
  let colMoney = formattedMoney.replace('COL', '$')
  colMoney = colMoney.replace('.00', '')


  return (
    <Link to={"/instruments/"+id} key={id}>
      <br></br>
      <StyledCard>
        <img src={img}/>
        <p>{brand}</p>
        <h2>{name}</h2>
        <h3>{`${colMoney}`}</h3>
        {/* <span>{`USD${price/4500}`}</span> */}
        <br></br>
        <br></br>
        {/* <b>{`Status:`}</b> <span>{`${status}`}</span> */}
        <b>{`Type:`}</b> <span>{`${categoryName}`}</span>
        <button class="inline-flex items-center h-8 px-5 text-background transition-primary duration-150 bg-secondary rounded-lg focus:shadow-outline hover:bg-primary col-span-2">
        <span>{`Add Car  `}</span>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
        </button>
        <span class=" text-ls font-bold leading-none text-tertiary bg-primary m-4 p-4 rounded absolute bottom-5 left-3" >{status}</span>
      </StyledCard>
    </Link>
  )
}