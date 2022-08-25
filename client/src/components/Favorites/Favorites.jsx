import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { EmptyFavorite, FavoriteContainer, StyledCard } from "./style";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { ContinueShopping } from "../Shopping/style";
import { deleteFavorites, getfavorites } from "../../redux/action/FavoritesActions";
import Swal from "sweetalert2";

export default function Favorites({
  id,
  name,
  brand,
  price,
  img,
  description,
  stock,
  status,
  categoryId,
  categoryName,
  instruments,
  raiting
}) {

  // const instruments = useSelector((state) => state.reducer.instruments);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems, 'cartitems en card')
  const favoriteItems = useSelector((state) => state.favorites.items);

  ///////////////////////////
  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  const token = window.localStorage.getItem("dataUser")

  console.log(favoritesList, "favoritesList")
  //const quanTities = useSelector((state) => state.favorites.quanTities);
  //let quanTitie = window.localStorage.getItem("quanTities")

  const favoriteRemoveHandle = (e, item) => {
    console.log("estoy en hanled deleFavorite");
    e.preventDefault();
    // dispatch(removeFromFavorites(favoriteItems, item));
    dispatch(deleteFavorites(instruments, token)).then(()=>{ dispatch(getfavorites(token))})
  };

  ////////////////////////////
  
  // console.log(favoriteItems, 'favoriteItems en card');
  const navigate = useNavigate();
  const active = window.localStorage.getItem('favoriteItemsActive');

  const [isFavorite, setIsFavorite] = useState(false);
  // const favoriteAddHandle = () => {
  //   dispatch(addToFavorites(favoriteItems, instruments));
  //   setIsFavorite((prevState) => !prevState);

  // }
  // const favoriteRemoveHandle = () => {
  //   setIsFavorite((prevState) => !prevState);
  //   dispatch(removeFromFavorites(favoriteItems, instruments));
  // }
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

  const hanledSummit = (e) => {
    e.preventDefault();
    dispatch(addToCart(cartItems, instruments));
    dispatch(SetTotalQuanTities(cartItems, instruments));

    Toast.fire({
      icon: "success",
      title: "Added to cart",
    });
  };

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

  // const { decQty, incQty, qty, addToCart, setShowCart } = useStateContext();
  const formattedMoney = price.toLocaleString("es-us", {
    style: "currency",
    currency: "COL",
  });
  let colMoney = formattedMoney.replace("COL", "$");
  colMoney = colMoney.replace(".00", "");

  return (
    <>

      {favoritesList.length >= 1 && (
        <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
          <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
            <img
              className='rounded-xl object-contain w-full h-full overflow-hidden'
              src={img} alt="" />
          </div>

          <div className="flex flex-col flex-grow pl-5 ">
            <div className="flex justify-between">
              <p>{brand}</p>
              <HiHeart className="h-10 cursor-pointer" onClick={favoriteRemoveHandle} />

            </div>
            <h4 className="text-xl">{name}</h4>
            <div className="border-b w-10 pt-2" />
            <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>


            <div className="flex justify-between items-end pt-5">
              {/* <div className="flex">
                <p className="flex items-center">
                  {`Type: ${raiting}`}
                </p>
              </div> */}
              <div>
                <p className="text-lg lg:text-2xl font-semibold pb-2">{colMoney}</p>

              </div>
            </div>
            <div className="flex justify-end items-end pt-5">
              <button onClick={(e) => (stock <= 0 || activaShow ? alert() : hanledSummit(e))}
                className=" bottom-0 inline-flex w-auto items-center h-8 px-2 text-background transition-primary duration-150 bg-secondary rounded-lg focus:shadow-outline hover:bg-primary col-span-1"
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
            </div>
          </div>
        </div>
      )}
    </>

  );
}
