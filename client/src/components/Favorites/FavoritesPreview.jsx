import React, { useState } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/stateContext";
import {
  Bottom,
  BtnContainer,
  FavoriteBottom,
  FavoriteContainer,
  FavoriteHeading,
  FavoriteNumItems,
  FavoriteWrapper,
  ContinueShopping,
  EmptyFavorite,
  Heading,
  Hidden,
  ItemDescription,
  ItemImage,
  PayBtn,
  Product,
  ProductContainer,
  QuantityDesc,
  QuantityDescMinus,
  QuantityDescNumFavorite,
  QuantityDescPlus,
  RemoveItemButton,
  SubTotal,
  Top,
  Total,
  TotalPrice,
} from "./style";
import util from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";

import e from "cors";
import { removeFromFavorites, removeOneFromFavorites } from "../../redux/action/FavoritesActions";
import { HiHeart } from "react-icons/hi";
import Buttons from "../Buttons/buttons";

const FavoritesPreview = () => {

  const { setShowFavorites } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const favoriteItems = useSelector((state) => state.favorites.items);
  //const quanTities = useSelector((state) => state.favorites.quanTities);
  //let quanTitie = window.localStorage.getItem("quanTities")

  const hanledDelete = (e, item) => {
    console.log("estoy en hanled aadFavorite");
    e.preventDefault();
    dispatch(removeFromFavorites(favoriteItems, item));
  };
  const navigateHandle = (e) => {
    window.location.href = "/";

    };
  return (
    <FavoriteWrapper>
      <FavoriteContainer>
        <FavoriteHeading
          type="button"
          // ShowFavorite={true}
          onClick={() => setShowFavorites(false)}
        >
          <AiOutlineLeft />
          <Heading>Back to shopping</Heading>
        </FavoriteHeading>

        {favoriteItems.length < 1 && (
          <EmptyFavorite>
            <HiHeart size={150} />
            <h3>Your Favorite List is empty</h3>

            <ContinueShopping
              type="button"
              // ShowFavorite={true}
              onClick={() => setShowFavorites(false)}
            // isSidebarOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)}
            >
              Continue Shopping
            </ContinueShopping>
          </EmptyFavorite>
        )}

        <ProductContainer>
          {favoriteItems.length >= 1 ? (
            <div>
              <FavoriteHeading>Your Favorite List</FavoriteHeading>
              {/* <FavoriteNumItems>({quanTities?quanTities:quanTitie} items)</FavoriteNumItems> */}
            </div>
          ) : (
            <Hidden>
              <FavoriteHeading>Your Favorite List</FavoriteHeading>
              {/* <FavoriteNumItems>({quanTities?quanTities:quanTitie} items)</FavoriteNumItems> */}
            </Hidden>
          )}

          {/* {favoriteItems.length >= 1 && */}
          {favoriteItems.length > 0 &&
            favoriteItems.map((item, index) => (
              <Product key={item.id}>
                <ItemImage src={item.img} alt="" />
                <ItemDescription>
                  <Top>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </Top>
                  <Bottom>

                    <QuantityDesc>
                      <RemoveItemButton
                        type="button"
                        onClick={(e) => hanledDelete(e, item)}
                      >

                        <TiDeleteOutline size={25} />
                      </RemoveItemButton>
                    </QuantityDesc>
                  </Bottom>
                </ItemDescription>
              </Product>
            ))}
        </ProductContainer>
        {favoriteItems.length >= 1 && (
          <FavoriteBottom>
            <BtnContainer>
              <Link to="/favorites">
                <Buttons type="button" text="Ver Lista Completa" onClick={navigateHandle}/>
              </Link>
            </BtnContainer>
          </FavoriteBottom>
        )}
      </FavoriteContainer>
    </FavoriteWrapper>
  );

};

export default FavoritesPreview;
