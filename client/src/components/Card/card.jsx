import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../../context/stateContext";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { StyledCard } from "./style";
import { useSelector, useDispatch } from 'react-redux';
// import Toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Card({
  id,
  name,
  brand,
  price,
  img,
  description,
  stock,
  count,
  status,
  categoryId,
  categoryName,
  instruments
}) {

  // const instruments = useSelector((state) => state.reducer.instruments);
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items);
  // const [stockShow, setStockShow2] = useState(false)
  const navigate = useNavigate()
  const hanledSummit = (e) => {
    e.preventDefault();
    dispatch(addToCart(cartItems, instruments))
    dispatch(SetTotalQuanTities(cartItems, instruments))
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const formattedMoney = price.toLocaleString("es-us", {
    style: "currency",
    currency: "COL",
  });
  let colMoney = formattedMoney.replace("COL", "$");
  colMoney = colMoney.replace(".00", "");

  let activaShow = false;
  cartItems.forEach(e => {

    if (e.id === id) {
      if (e.stock <= e.count) {
        activaShow = true
      }else{
        activaShow = false
      }
      
    }
  });

  const alert = () => {
    Toast.fire({
      icon: "warning",
      title: "Stock sold out",
    })
  }
  return (
    <StyledCard>

      <img src={img} alt={name} onClick={e => navigate("/instruments/" + id)} />
      <p>{brand}</p>
      <h2 onClick={e => navigate("/instruments/" + id)}>{name}{stock<=0 ? <p className="text-[#d72a1e]"> Stock sold out</p> : <p>Stock {stock}</p>}</h2>
      <h3 onClick={e => navigate("/instruments/" + id)}>{`${colMoney}`}</h3>
      <br></br>
      <br></br>
      <b>{`Type:`}</b> <span onClick={e => navigate("/instruments/" + id)}>{`${categoryName}`}</span>

      <button onClick={(e) => stock<=0 || activaShow ? alert() : hanledSummit(e)}
        className="inline-flex items-center h-8 px-2 text-background transition-primary duration-150 bg-secondary rounded-lg focus:shadow-outline hover:bg-primary col-span-1"
      >
        <span className="">{`➕`}</span>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 25 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"
          />
        </svg>
      </button>


    </StyledCard>
  );
}
