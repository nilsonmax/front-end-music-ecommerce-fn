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
import { HiShoppingCart } from "react-icons/hi";
import Cart from "../Shopping/cart";
import Logo from "../../assets/Logo.png";

export default function NavBarLogin({ setCurrentPage }) {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const quanTities = useSelector((state) => state.cart.quanTities);

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
            className={`flex-1 justify-self-center pb-3 mt- lg:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="font-bold cursor-pointer transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <p onClick={() => navigate("/aboutUs")}>About US</p>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <Link to="/user/Profile">
                  <p>Profile</p>
                </Link>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <Link
                  onClick={() => {
                    window.localStorage.removeItem("dataUser");
                    window.location.href = "/";
                  }}
                  to="/user/Profile"
                >
                  <p>Log out</p>
                </Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
                <Search setCurrentPage={setCurrentPage} />
              </div>
              <div
                onClick={() => {
                  window.localStorage.removeItem("dataUser");
                  window.location.href = "/";
                }}
              >
                <Link to="/user/Profile">
                  <h2 className=" py-1 text-1xl text-secondary text-lg underline lg:inline-block">
                    {`Welcome ${user.userName}`}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          <div className="lg:inline-block">
            <Search setCurrentPage={setCurrentPage} />
          </div>
        </div>
        <Link to="/user/Profile">
          <h2 className="hidden lg: py-1 text-1xl text-secondary text-lg underline lg:inline-block">
            {`Welcome ${user.userName}`}
          </h2>
        </Link>

        <button type="button" onClick={() => setShowCart(true)} className=" relative link flex items-center">
          {quanTities !== 0 && <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">{quanTities !== 0 && quanTities}</span>}

          <HiShoppingCart size={20} className="h-10" />
          <p className="hidden md:inline font-extrabold md: text-sm mt-2">
            Cart
          </p>
        </button>
        {showCart && <Cart />}
      </DivJustifyBetween>
    </NavContainer>
  );
}
