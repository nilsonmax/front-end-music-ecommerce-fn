import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { DivItemsCenter, DivJustifyBetween, NavContainer, Button } from "./style";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <NavContainer>
      <DivJustifyBetween>

        <DivItemsCenter>

          <h2 className="text-2xl font-bold">LOGO</h2>

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
            className={`flex-1 justify-self-center pb-3 mt- lg:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >

            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-orange-600">
                <Link to="/">
                  <p>Home</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-orange-600">
                <Link to="/">
                  <p>Instruments</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-orange-600">
                <Link to="/instruments/create">
                  <p>Create</p>
                </Link>
              </li>
              <li className="font-bold transition duration-150 border-b-2 border-transparent hover:border-orange-600">
                <p>About US</p>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden lg:inline-block">
              <div className="inline-block w-full">
                <Search />
              </div>
              <div className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                Sign in
              </div>
              <div className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
                Sign up
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          <div className="lg:inline-block">
            <Search />
          </div>
          <div className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 lg:inline-block">
            Sign in
          </div>
          <div className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 lg:inline-block">
            Sign up
          </div>
        </div>
      </DivJustifyBetween>
    </NavContainer>
  );
}
