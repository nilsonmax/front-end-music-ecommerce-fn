import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { DivItemsCenter, DivJustifyBetween, NavContainer, Button } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";

export default function NavBarLogin({ setCurrentPage }) {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();


  //traer nombre de cuenta
  let user=useSelector(e=>e.user)
  useEffect(()=>{
    const token=window.localStorage.getItem("dataUser");
    console.log(decodeToken(JSON.parse(token).token))
  })

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
                <Link to="/user/info">
                  <p>User Info</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-bluemunsell">
                <p>About US</p>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
                <Search setCurrentPage={setCurrentPage} />
              </div>
              <div onClick={() =>{
                window.localStorage.removeItem("dataUser")
                window.location.href="/"
              }}>
                <div className="inline-block w-full  py-1 my-2 text-center text-white  bg-darkconrflower rounded-full shadow hover:bg-[#F37042] ">
                {user.userName?user.userName:"usuario"}
                </div>
              </div>
            </div>
           
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          <div className="lg:inline-block">
            <Search setCurrentPage={setCurrentPage} />
          </div>
          <Link to="/user/perfil">
          <div className="px-2 py-1 text-white text-1xl bg-darkconrflower rounded-full shadow hover:bg-[#F37042] lg:inline-block">
                    {user.userName?user.userName:"usuario"}
            </div>
          </Link>
        </div>

      </DivJustifyBetween>
    </NavContainer>
  );
}