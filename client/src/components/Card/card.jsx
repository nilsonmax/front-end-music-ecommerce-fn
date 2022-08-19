import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { addToFavorites, removeFromFavorites, removeOneFromFavorites } from "../../redux/action/FavoritesActions";
import { StyledCard } from "./style";
import { HiHeart, HiOutlineHeart, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';

export default function Card({
  id,
  name,
  brand,
  price,
  img,
  rating,
  description,
  stock,
  status,
  categoryId,
  categoryName,
  instruments
}) {

  // const instruments = useSelector((state) => state.reducer.instruments);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems, 'cartitems en card')
  const favoriteItems = useSelector((state) => state.favorites.items);
  const favoriteItemsActive = useSelector((state) => state.favorites.items.active);
  console.log(favoriteItems, 'favoriteItems en card');
  const navigate = useNavigate();
  const active= window.localStorage.getItem('favoriteItemsActive');

  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteAddHandle = ()=>{
    dispatch(addToFavorites(favoriteItems, instruments));
    setIsFavorite((prevState) => !prevState);

  }
  const favoriteRemoveHandle = ()=>{
    setIsFavorite((prevState) => !prevState);
    dispatch(removeFromFavorites(favoriteItems, instruments));
  }

  const hanledSummit = (e) => {
    console.log('estoy en hanled aadcart')
    e.preventDefault();
    dispatch(addToCart(cartItems, instruments))
    dispatch(SetTotalQuanTities(cartItems, instruments))
  }
  const ratingStars = (star) => {
    let stars = [];
    for (let i = 0; i < Math.floor(star); i++) {
      stars.push(
        <span>
          <HiStar className="h-5 text-red-400 cursor-pointer" />
        </span>
      );
    }
    return stars;
  };

  // const { decQty, incQty, qty, addToCart, setShowCart } = useStateContext();
  const formattedMoney = price.toLocaleString("es-us", {
    style: "currency",
    currency: "COL",
  });
  let colMoney = formattedMoney.replace("COL", "$");
  colMoney = colMoney.replace(".00", "");

  return (
    <StyledCard>

      <img src={img} alt={name} onClick={e => navigate("/instruments/" + id)} />

      <div className="flex justify-between">
        <p>{brand}</p>
        
        {/* <HiOutlineHeart className="h-7 cursor-pointer" onClick={favoriteAddHandle} />

        <HiHeart className="h-7 cursor-pointer" onClick={favoriteRemoveHandle} /> */}

        { !isFavorite ? 
          (
            <HiOutlineHeart className="h-7 cursor-pointer" onClick={favoriteAddHandle} />
          ) : (
            <HiHeart className="h-7 cursor-pointer" onClick={favoriteRemoveHandle} />
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
      <p>{ratingStars(rating)}</p>

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
