import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import {
  addToFavorites,
  deleteFavorites,
  getfavorites,
  postFavorites,
  removeFromFavorites,
} from "../../redux/action/FavoritesActions";
import { StyledCard } from "./style";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import Swal from "sweetalert2";
import paintStars from "../../utils/paintStars";

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
  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  // console.log(favoritesList, "favoritesList 1")
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
  const token = window.localStorage.getItem("dataUser");
  const [isFavorite, setIsFavorite] = useState(false);
  const isFavorite2 = window.localStorage.getItem("isFavorite2");

  useEffect(() => {
    dispatch(getfavorites(token));
  }, []);

  const toogleFavoriteAddHandler = () => {
    setIsFavorite((prevState) => !prevState);
    // localStorage.setItem("isFavorite2", JSON.stringify(isFavorite));
    // dispatch(addToFavorites(favoriteItems, instruments));
    dispatch(postFavorites(instruments, token)).then(() => {
      dispatch(getfavorites(token));
    });
  };

  // const hanledDelete = (e, item) => {
  //   console.log("estoy en hanled deleFavorite");
  //   e.preventDefault();
  //   // dispatch(removeFromFavorites(favoriteItems, item));
  //   dispatch(deleteFavorites(item, token)).then(()=>{ dispatch(getfavorites(token))})
  // };

  const toogleFavoriteRemoveHandler = () => {
    setIsFavorite((prevState) => !prevState);
    // localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
    // dispatch(removeFromFavorites(favoriteItems, instruments));
    dispatch(deleteFavorites(instruments, token)).then(() => {
      dispatch(getfavorites(token));
    });
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

      <div
        onClick={(e) => navigate("/instruments/" + id)}
        className="font-bold text-black important! flex">
        {paintStars(raiting)}
      </div>
      {/* {console.log(favoriteItems, "isFavorite")} */}
      {/* !favoriteItems ? */}
      {/* {!isFavorite ? (
        <HiOutlineHeart
          className="h-10 cursor-pointer absolute top-0 left-5"
          onClick={toogleFavoriteAddHandler}
        />
      ) : (
        <HiHeart
          className="h-10 cursor-pointer absolute top-0 left-5"
          onClick={toogleFavoriteRemoveHandler}
        />
      )} */}

      {favoritesList && favoritesList.find((e) => e.id === id) ? (
        <HiHeart
          className="h-10 cursor-pointer absolute top-0 right-14"
          onClick={toogleFavoriteRemoveHandler}
        />
      ) : (
        <HiOutlineHeart
          className="h-10 cursor-pointer absolute top-0 right-14"
          onClick={toogleFavoriteAddHandler}
        />
      )}
      <h2 onClick={(e) => navigate("/instruments/" + id)}>{name}</h2>
      <h3 onClick={(e) => navigate("/instruments/" + id)}>{`${colMoney}`}</h3>
      <div
        onClick={(e) => navigate("/instruments/" + id)}
        className="bg-secondary py-2 rounded-full m-0 text-xs font-bold text-white text-center hidden md:block">
        {status}
      </div>
      <button
        onClick={(e) => (stock <= 0 || activaShow ? alert() : hanledSummit(e))}
        className="flex items-center h-8 px-2 text-background transition-primary duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-primary col-span-1">
        <span
          onClick={(e) => navigate("/instruments/" + id)}
          className="">{`➕`}</span>
        <p>{paintCart()}</p>
      </button>
    </StyledCard>
  );
}
