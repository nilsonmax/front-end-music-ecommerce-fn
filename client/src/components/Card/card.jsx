import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/action/FavoritesActions";
import { StyledCard } from "./style";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
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
  instruments,
  raiting,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const navigate = useNavigate();
  const hanledSummit = (e) => {
    e.preventDefault();
    dispatch(addToCart(cartItems, instruments));
    dispatch(SetTotalQuanTities(cartItems, instruments));

    Toast.fire({
      icon: "success",
      title: "Added to cart",
    });
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const isFavorite2 = window.localStorage.getItem("isFavorite2");

  const toogleFavoriteAddHandler = () => {
    setIsFavorite((prevState) => !prevState);
    localStorage.setItem("isFavorite2", JSON.stringify(isFavorite));
    dispatch(addToFavorites(favoriteItems, instruments));
  };

  const toogleFavoriteRemoveHandler = () => {
    setIsFavorite((prevState) => !prevState);
    localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
    dispatch(removeFromFavorites(favoriteItems, instruments));
  };

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
  cartItems.forEach((e) => {
    if (e.id === id) {
      if (e.stock <= e.count) {
        activaShow = true;
      } else {
        activaShow = false;
      }
    }
  });

  const alert = () => {
    Toast.fire({
      icon: "warning",
      title: "Stock sold out",
    });
  };

  function paintStar() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </>
    );
  }

  function paintCart(params) {
    return (
      <>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 25 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"
          />
        </svg>
      </>
    );
  }
  return (
    <StyledCard>
      <img
        src={img}
        alt={name}
        onClick={(e) => navigate("/instruments/" + id)}
      />
      <p>{brand}</p>
      <p className="font-bold text-black important!">
        {paintStar()}
        {raiting}
        <b className="font-thin">{raiting ? `total` : `No rating`}</b>
      </p>
      {console.log(favoriteItems, "isFavorite")}
      {/* !favoriteItems ? */}
      {!isFavorite ? (
        <HiOutlineHeart
          className="h-10 cursor-pointer absolute top-0 right-5"
          onClick={toogleFavoriteAddHandler}
        />
      ) : (
        <HiHeart
          className="h-10 cursor-pointer absolute top-0 right-5"
          onClick={toogleFavoriteRemoveHandler}
        />
      )}
      <h2 onClick={(e) => navigate("/instruments/" + id)}>{name}</h2>
      <h3 onClick={(e) => navigate("/instruments/" + id)}>{`${colMoney}`}</h3>
      <b>{`Type:`}</b>{" "}
      <span
        onClick={(e) =>
          navigate("/instruments/" + id)
        }>{`${categoryName}`}</span>
      {/*         <span " text-ls font-bold leading-none text-tertiary rounded bottom-5 col-span-1 p-2 absolute top-2 left-2" >{status}</span> */}
      {/* <a
            href={`#${product.id}`}
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          ></a> */}
      <button
        onClick={(e) => (stock <= 0 || activaShow ? alert() : hanledSummit(e))}
        className="flex items-center h-8 px-2 text-background transition-primary duration-150 bg-secondary rounded-lg focus:shadow-outline hover:bg-primary col-span-1">
        <span className="">{`➕`}</span>
        <p>{paintCart()}</p>
      </button>
    </StyledCard>
  );
}
