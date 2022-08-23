import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/stateContext";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { addToFavorites, removeFromFavorites, removeOneFromFavorites } from "../../redux/action/FavoritesActions";
import { StyledCard } from "./style";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
// import Toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";

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
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems, 'cartitems en card')
  const favoriteItems = useSelector((state) => state.favorites.items);

  // console.log(favoriteItems, 'favoriteItems en card')
  const navigate = useNavigate()
  const hanledSummit = (e) => {
    e.preventDefault();
    dispatch(addToCart(cartItems, instruments))
    dispatch(SetTotalQuanTities(cartItems, instruments))
  }
  const [isFavorite, setIsFavorite] = useState(false);
  const isFavorite2 = window.localStorage.getItem("isFavorite2");

  const toogleFavoriteAddHandler = () => {
    // prevState ? setIsFavorite(prevState => !prevState) : prevStateSave
    setIsFavorite(prevState => !prevState);
    localStorage.setItem("isFavorite2", JSON.stringify(isFavorite));
    dispatch(addToFavorites(favoriteItems, instruments));
  }

  const toogleFavoriteRemoveHandler = () => {

    setIsFavorite(prevState => !prevState);
    localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
    dispatch(removeFromFavorites(favoriteItems, instruments));
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
      } else {
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
      <div className="flex justify-between">

        <p>{brand}</p>
        {console.log(favoriteItems, 'isFavorite')}
          {/* !favoriteItems ? */}
        { 
          !isFavorite ?
            (
              <HiOutlineHeart className="h-10 cursor-pointer" onClick={toogleFavoriteAddHandler} />
            ) : (
              <HiHeart className="h-10 cursor-pointer" onClick={toogleFavoriteRemoveHandler} />
            ) 

        }
      </div>
      <h2 onClick={e => navigate("/instruments/" + id)}>{name}</h2>
      <h3 onClick={e => navigate("/instruments/" + id)}>{`${colMoney}`}</h3>
      {/* <span>{`USD${price/4500}`}</span> */}
      <br></br>
      <br></br>
      {/* <b>{`Status:`}</b> <span>{`${status}`}</span> */}
      <b>{`Type:`}</b> <span onClick={e => navigate("/instruments/" + id)}>{`${categoryName}`}</span>
      {/*         <span " text-ls font-bold leading-none text-tertiary rounded bottom-5 col-span-1 p-2 absolute top-2 left-2" >{status}</span> */}
      {/* <a
            href={`#${product.id}`}
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          ></a> */}
      <button onClick={(e) => hanledSummit(e)}
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
