import React from 'react'
import { useSelector } from 'react-redux';
import Favorites from '../../components/Favorites/Favorites'
import NavBarLogin from '../../components/NavBarLogin/NavbarLogin'

const FavoritesContainer = () => {
  const favoriteItems = useSelector((state) => state.favorites.items);
  return (
    <>
      <NavBarLogin />
      <div className="relative py-10 px-40">
        {favoriteItems.map((item) => {
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
              categoryName={item.category.name}
              instruments={item}
            />
          );
        })}
      </div>
    </>

  )
}

export default FavoritesContainer
