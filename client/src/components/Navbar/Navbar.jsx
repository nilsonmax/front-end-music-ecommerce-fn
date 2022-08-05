import { useState } from "react";
import { Search } from "../Search/Search";
import { DivItemsCenter, DivJustifyBetween, NavContainer, Button, Li } from "./style";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

return (
    <NavContainer>
      <DivJustifyBetween>
        <div>
          <DivItemsCenter>

            <h2 className="text-2xl font-bold">LOGO</h2>

            <div className="md:hidden">
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
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt- md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <Li>
                Home
              </Li>
              <Li>
                Instruments
              </Li>
              <Li>
                Create
              </Li>
              <Li>
                About US
              </Li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
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
        <div className="hidden space-x-2 md:inline-block">
          <div className="md:inline-block">
            <Search />
          </div>
          <div className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 md:inline-block">
            Sign in
          </div>
          <div className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 md:inline-block">
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </DivJustifyBetween>
    </NavContainer>
  );
}
