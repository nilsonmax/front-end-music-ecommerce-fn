import React, { useEffect, useState } from "react";
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
import {
  deleteFavorites,
  getfavorites,
  removeFromFavorites,
  removeOneFromFavorites,
} from "../../redux/action/FavoritesActions";
import { HiHeart } from "react-icons/hi";
import Buttons from "../Buttons/buttons";
import { ButtonStyled } from "../Buttons/styled";
// import { ButtonStyled } from './../Buttons/styled';

const FavoritesPreview = () => {
  const { setShowFavorites } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteItems = useSelector((state) => state.favorites.items);
  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  const token = window.localStorage.getItem("dataUser");

  const hanledDelete = (e, item) => {
    console.log("estoy en hanled deleFavorite");
    e.preventDefault();
    dispatch(deleteFavorites(item, token)).then(() => {
      dispatch(getfavorites(token));
    });
  };

  useEffect(() => {
    dispatch(getfavorites(token));
  }, []);

  const navigateHandle = (e) => {
    dispatch(getfavorites(token));
    setShowFavorites(true);
    window.location.href = "/favorites";
  };
  return (
    <FavoriteWrapper>
      <FavoriteContainer>
        <FavoriteHeading
          type="button"
          // ShowFavorite={true}
          onClick={() => setShowFavorites(false)}>
          <AiOutlineLeft />
          <Heading>Back to shopping</Heading>
        </FavoriteHeading>

        {/* {favoriteItems.length < 1 && ( */}
        {favoritesList.length < 1 && (
          <EmptyFavorite>
            <HiHeart size={150} />
            <h3>Your favorites list is empty</h3>

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
          {/* {favoriteItems.length >= 1 ? ( */}
          {favoritesList.length >= 1 ? (
            <div>
              <FavoriteHeading>Your favorites</FavoriteHeading>
              {/* <FavoriteNumItems>({quanTities?quanTities:quanTitie} items)</FavoriteNumItems> */}
            </div>
          ) : (
            <Hidden>
              <FavoriteHeading>Your favorites</FavoriteHeading>
              {/* <FavoriteNumItems>({quanTities?quanTities:quanTitie} items)</FavoriteNumItems> */}
            </Hidden>
          )}

          {/* {favoriteItems.length >= 1 && */}
          {/* {favoriteItems.length > 0 && */}
          {favoritesList.length > 0 &&
            favoritesList.map((item, index) => (
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
                        onClick={(e) => hanledDelete(e, item)}>
                        <TiDeleteOutline size={25} />
                      </RemoveItemButton>
                    </QuantityDesc>
                  </Bottom>
                </ItemDescription>
              </Product>
            ))}
        </ProductContainer>
        {favoritesList.length >= 1 && (
          <FavoriteBottom>
            <BtnContainer>
              {/* <Link to="/favorites"> */}
              <ContinueShopping
                type="button"
                onClick={() => setShowFavorites(false)}>
                <Link to="/favorites">View full list</Link>
              </ContinueShopping>
              {/* </Link> */}
            </BtnContainer>
          </FavoriteBottom>
        )}
      </FavoriteContainer>
    </FavoriteWrapper>
  );
};

export default FavoritesPreview;
