import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { DivItemsCenter, DivJustifyBetween, NavContainer, Button } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";
import { get_user } from '../../redux/action/index';
import { useStateContext } from "../../context/stateContext";
import { HiShoppingCart } from "react-icons/hi";
import Cart from "../Shopping/cart";

export default function NavBarLogin({ setCurrentPage }) {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const { showCart, setShowCart, totalQuantities } = useStateContext();


  //traer nombre de cuenta
  let user = useSelector(e => e.user)
  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    dispatch(get_user(token))
  }, [])

  return (
    <NavContainer>
      <DivJustifyBetween>

        <DivItemsCenter>
          <Link to="/">
            <h2 className="text-2xl font-bold">LOGO</h2>
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
            className={`flex-1 justify-self-center pb-3 mt- lg:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}>

            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <p>About US</p>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <Link to="/user/Profile">
                  <p>Profile</p>
                </Link>
              </li>

              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <Link onClick={() => { window.localStorage.removeItem("dataUser"); window.location.href = "/" }} to="/user/Profile">
                  <p>Log out</p>
                </Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
                <Search setCurrentPage={setCurrentPage} />
              </div>
              <div onClick={() => {
                window.localStorage.removeItem("dataUser")
                window.location.href = "/"
              }}>
                <div className="inline-block w-full  py-1 my-2 text-center text-white  bg-darkconrflower rounded-full shadow hover:bg-[#F37042] ">
                  NickName
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          <div className="lg:inline-block">
            <Search setCurrentPage={setCurrentPage} />
          </div>
          <h2 className="px-2 py-1 text-1xl text-bluemunsell font-bold lg:inline-block">
            {`Welcome ${user.userName}`}
          </h2>
          {/*<div onClick={() => {window.localStorage.removeItem("dataUser"); window.location.href = "/"}} className="px-2 py-1 text-white text-1xl bg-darkconrflower rounded-full shadow hover:bg-[#F37042] lg:inline-block">
            NickName
            </div>*/}
        </div>
      <button type="button" onClick={() => setShowCart(true)} className=" relative link flex items-center">
      {totalQuantities!==0&&<span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-teal-500 text-center rounded-full text-ora">{totalQuantities!==0&&totalQuantities}</span>}
        <HiShoppingCart size={20} className="h-10" />
        <p className="hidden md:inline font-extrabold md: text-sm mt-2">Cart</p>
      </button>
      {showCart && <Cart />}
      </DivJustifyBetween>
    </NavContainer>
  );
}