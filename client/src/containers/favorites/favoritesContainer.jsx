import React, { useEffect } from 'react'
import { HiHeart } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Favorites from '../../components/Favorites/Favorites'
import { ContinueShopping, EmptyFavorite } from '../../components/Favorites/style';
import NavBarLogin from '../../components/NavBarLogin/NavbarLogin'
import { getfavorites, setShowFavorites } from '../../redux/action/FavoritesActions';

const FavoritesContainer = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("dataUser")
  useEffect(() => {
    dispatch(getfavorites(token))
  }, [])
  // const favoriteItems = useSelector((state) => state.favorites.items);
  const favoritesList2 = useSelector((state) => state.favorites.favoritesList);
  console.log(favoritesList2, "favoritesList2 2")
  const navigate = useNavigate();
  return (
    <>
      <NavBarLogin />
      <div className="relative py-10 px-40">
        {favoritesList2.length>0 ? favoritesList2.map((item) => {
          console.log(favoritesList2, "returnn")
          return (
            <Favorites
              key={item.id}
              id={item.id}
              name={item.name}
              brand={item.brand}
              price={item.price}
              img={item.img}
              description={item.description}
              stock={item.stock}
              status={item.status}
              categoryId={item.categoryId}
              instruments={item}
            />
          );
        }) : (
          <EmptyFavorite>
            <h3>Your Favorite List is empty</h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <ContinueShopping
              type="button"
              // ShowFavorite={true}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </ContinueShopping>
          </EmptyFavorite>)

        }
      </div>
    </>

  )
}

export default FavoritesContainer
