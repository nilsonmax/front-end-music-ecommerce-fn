import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../Search/Search";
import {
  DivItemsCenter,
  DivJustifyBetween,
  NavContainer,
  Button,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";
import { get_user } from "../../redux/action/index";
import { useStateContext } from "../../context/stateContext";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi";
import Cart from "../Shopping/cart";
import Logo from "../../assets/Logo.png";
import FavoritesPreview from "../Favorites/FavoritesPreview";
import { getDataClearCar } from "../../redux/action/cartActions";

export default function NavBarLogin({ setCurrentPage }) {
  const [navbar, setNavbar] = useState(false);
  // const [quanties, setQuatities] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showCart, setShowCart, showFavorites, setShowFavorites } =
    useStateContext();
  const quanTities = useSelector((state) => state.cart.quanTities);
  const quanTitie = window.localStorage.getItem("quanTities");

  //traer nombre de cuenta
  let user = useSelector((e) => e.reducer.user);
  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");

    dispatch(get_user(token));
  }, []);

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
                  fill="currentColor">
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
                  strokeWidth={2}>
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
        {/*   para merge
         */}{" "}
        <div>
          <div
            className={`flex-1 bg-black px-8  justify-self-center pb-9  lg:block   ${
              navbar ? "block" : "hidden"
            }`}>
            {/* <ul className="items-center text-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 lg:bg-red-700 lg:"> */}
            <ul className="flex justify-between lg:h-[20px]">
              <li className="font-bold cursor-pointer transition duration-150 border-b-2 border-transparent lg:mt-4">
                <Link to={"/aboutUs"}>
                  <p className=" hover:border-bluemunsell hover:border-b-2">
                    About US
                  </p>
                </Link>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent lg:mx-5 lg:mt-4">
                <Link to="/user/Profile">
                  <p className=" hover:border-bluemunsell hover:border-b-2">
                    Profile
                  </p>
                </Link>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent lg:mt-4">
                <Link
                  onClick={() => {
                    dispatch(getDataClearCar());
                    window.localStorage.removeItem("dataUser");
                    window.location.href = "/";
                  }}
                  to="/user/Profile">
                  <p className=" hover:border-bluemunsell hover:border-b-2">
                    Log out
                  </p>
                </Link>
              </li>
            </ul>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowFavorites(true)}
                className="flex relative link items-center lg:hidden">
                <HiOutlineHeart size={20} className="h-10" />
                <p className="text-white">Favorites</p>
              </button>
              {showFavorites && <FavoritesPreview />}
              <button
                type="button"
                onClick={() => setShowCart(true)}
                className="flex relative link  items-center lg:hidden">
                {(quanTities ? quanTities : quanTitie) !== 0 && (
                  <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">
                    {quanTities
                      ? quanTities
                      : quanTitie !== 0 && quanTities
                      ? quanTities
                      : quanTitie}
                  </span>
                )}

                <HiShoppingCart size={20} className="h-10" />
                <p className="text-white ">Cart</p>
              </button>
            </div>

            <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
                <Search setCurrentPage={setCurrentPage} />
              </div>
              <div
                className="box-decoration-slice bg-gradient-to-r from-primary to-secondary py-1 text-center rounded-sm"
                onClick={() => {
                  window.localStorage.removeItem("dataUser");
                  window.location.href = "/";
                }}>
                <a to="/user/Profile">
                  <h2>{`Welcome ${user.userName}`}</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          <div className="lg:inline-block">
            <Search setCurrentPage={setCurrentPage} />
          </div>
        </div>
        <a to="/user/Profile">
          <h2 className="hidden lg:block box-decoration-slice bg-gradient-to-r from-primary to-secondary px-2 rounded-sm">
            {`Welcome ${user.userName}`}
          </h2>
        </a>
        <button
          type="button"
          onClick={() => setShowFavorites(true)}
          className="hidden lg:flex relative link items-center">
          <HiOutlineHeart size={20} className="h-10" />
          <p className="hidden md:inline font-extrabold md: text-sm mt-2 hover:border-bluemunsell hover:border-b-2">
            Favorites
          </p>
        </button>
        {showFavorites && <FavoritesPreview />}
        <button
          type="button"
          onClick={() => setShowCart(true)}
          className=" hidden lg:flex relative link  items-center">
          {(quanTities ? quanTities : quanTitie) !== 0 && (
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">
              {quanTities
                ? quanTities
                : quanTitie !== 0 && quanTities
                ? quanTities
                : quanTitie}
            </span>
          )}

          <HiShoppingCart size={20} className="h-10" />
          <p className="hidden md:inline font-extrabold md: text-sm mt-2 hover:border-bluemunsell hover:border-b-2">
            Cart
          </p>
        </button>
        {showCart && <Cart />}
      </DivJustifyBetween>
    </NavContainer>
  );
}
