import React from "react";
import { Link } from "react-router-dom";
import { StyledCard } from "./style";
// import { BsCart3 } from "react-icons/bs";


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
        <img src={img} alt={name}/>
        <p>{brand}</p>
        <h2>{name}</h2>
        <h3>{`${colMoney}`}</h3>
        {/* <span>{`USD${price/4500}`}</span> */}
        <br></br>
        <br></br>
        {/* <b>{`Status:`}</b> <span>{`${status}`}</span> */}
        <b>{`Type:`}</b> <span>{`${categoryName}`}</span>
{/*         <span class=" text-ls font-bold leading-none text-tertiary rounded bottom-5 col-span-1 p-2 absolute top-2 left-2" >{status}</span> */}
        <button class="inline-flex items-center h-8 px-2 text-background transition-primary duration-150 bg-secondary rounded-lg focus:shadow-outline hover:bg-primary col-span-1">
        <span className="">{`➕`}</span>
            <svg width="24px" height="24px" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#FFFFFF" stroke-width="1" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"/>
          </svg>
        </button>
      </StyledCard>
    </Link>
  )
}