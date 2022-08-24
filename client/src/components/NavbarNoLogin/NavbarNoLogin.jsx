import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../Search/Search";
import {
  DivItemsCenter,
  DivJustifyBetween,
  NavContainer,
  Button,
} from "./style";
import { useDispatch } from "react-redux";
import { showLogin } from "../../redux/action/index";
import { useStateContext } from "../../context/stateContext";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi";
import Cart from "../Shopping/cart";
import Logo from "../../assets/Logo.png";
import FavoritesPreview from "../Favorites/FavoritesPreview";

export default function NavBarNoLogin({ setCurrentPage }) {
  const { showCart, showFavorites, totalQuantities } = useStateContext();
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <NavContainer>
      <DivJustifyBetween>
        <DivItemsCenter>
          <Link to="/">
            <img src={Logo} className="w-14" />
          </Link>

          <div className="lg:hidden">
            <Button onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </DivItemsCenter>

        <div>
          <div
            className={`flex-1 bg-black p-10 rounded  ${navbar ? "block" : "hidden"
              }`}
          >
            <div className="flex justify-around">

              <ul className="items-center  justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="font-bold transition cursor-pointer duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                  <p onClick={() => navigate("/aboutUs")}>About US</p>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => dispatch(showLogin(true))}
                className=" relative link flex items-center"
              >
                <HiOutlineHeart size={20} className="h-10" />
                <p className="hidden md:inline font-extrabold md: text-sm mt-2">
                  Favorites
                </p>
              </button>
              <button
                type="button"
                onClick={() => dispatch(showLogin(true))}
                className=" relative link flex items-center"
              >
                {totalQuantities !== 0 && (
                  <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">
                    {totalQuantities !== 0 && totalQuantities}
                  </span>
                )}
                <HiShoppingCart size={20} className="h-10" />
                <p className="hidden md:inline font-extrabold md: text-sm mt-2">
                  Cart
                </p>
              </button>
            </div>

            <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
                <Search setCurrentPage={setCurrentPage} />
              </div>
              <div
                onClick={() => dispatch(showLogin(true))}
                className="inline-block w-full px-4 py-2 text-center text-white  bg-bluemunsell rounded-md shadow hover:bg-steelteal "
              >
                Sign in
              </div>
              <div
                onClick={(e) => navigate("/signup")}
                className="inline-block w-full px-4 py-2 text-center text-white  bg-bluemunsell rounded-md shadow hover:bg-steelteal "
              >
                Sign up
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-around ">
              <ul className="items-center  justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="font-bold transition cursor-pointer duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                  <p onClick={() => navigate("/aboutUs")}>About US</p>
                </li>
              </ul>
            </div>
        <div className="hidden space-x-4 lg:flex justify-between">
          <div className="">
            <Search setCurrentPage={setCurrentPage} />
          </div>
          <div
            onClick={() => dispatch(showLogin(true))}
            className="my-2 px-2 text-lg font-semibold bg-secondary rounded-xl text-white hover:bg-primary cursor-pointer ease-in-out duration-300 "
          >
            Sign In
          </div>
          <div
            onClick={(e) => navigate("/signup")}
            className="my-2 px-2 text-lg font-semibold bg-secondary rounded-xl text-white hover:bg-primary cursor-pointer ease-in-out duration-300"
          >
            Sign Up
          </div>
              <button
                type="button"
                onClick={() => dispatch(showLogin(true))}
                className=" relative link flex items-center"
              >
                <HiOutlineHeart size={20} className="h-10" />
                <p className="hidden md:inline font-extrabold md: text-sm mt-2">
                  Favorites
                </p>
              </button>
              <button
                type="button"
                onClick={() => dispatch(showLogin(true))}
                className=" relative link flex items-center"
              >
                {totalQuantities !== 0 && (
                  <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">
                    {totalQuantities !== 0 && totalQuantities}
                  </span>
                )}
                <HiShoppingCart size={20} className="h-10" />
                <p className="hidden md:inline font-extrabold md: text-sm mt-2">
                  Cart
                </p>
              </button>
          
          {showCart && <Cart />}
          {showFavorites && <FavoritesPreview />}
        </div>
      </DivJustifyBetween>
    </NavContainer>
  );
}
