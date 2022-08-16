// import { useState } from "react";
import { Link } from "react-router-dom";
// import { Search } from "../Search/Search";
import { DivItemsCenter, DivJustifyBetween, NavContainer } from "./style";
import Logo from "../../assets/Logo.png";

export default function Header({ setCurrentPage }) {
  // const [navbar, setNavbar] = useState(false);

  return (
    <NavContainer>
      <DivJustifyBetween>
        <DivItemsCenter>
          <Link to="/">
            <img src={Logo} className="w-14" />
          </Link>

          {/* <div className="lg:hidden">
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
          </div> */}
        </DivItemsCenter>

        {/* <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt- lg:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          > */}

        {/*  <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-[#F37042]">
                <Link to="/">
                  <p>Home</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-[#F37042]">
                <Link to="/instruments/create">
                  <p>Create</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-[#F37042]">
                <p>About US</p>
              </li> 
            </ul>*/}

        {/* <div className="mt-3 space-y-2 lg:hidden">
              <div className="inline-block w-full">
               
              </div>
               <div className="inline-block w-full px-4 py-2 text-center  text-background bg-primary  rounded-md shadow hover:bg-tertiary ">
                Sign in
              </div>
              <div className="inline-block w-full px-4 py-2 text-center text-primary  bg-orange rounded-md shadow hover:bg-tertiary ">
                Sign up
              </div>
            </div> */}
        {/* </div>
        </div> */}
        {/* <div className="hidden space-x-2 lg:inline-block">

          <div className="px-4 py-2 cursor-pointer text-background bg-primary  rounded-md shadow hover:bg-tertiary  lg:inline-block">
            <Link to="/login">Sign in</Link>
          </div>
          <div className="px-4 py-2 text-primary  bg-orange rounded-md shadow hover:bg-tertiary lg:inline-block">
            <Link to="/signup">Sign up</Link>
          </div>
        </div> */}
      </DivJustifyBetween>
    </NavContainer>
  );
}
