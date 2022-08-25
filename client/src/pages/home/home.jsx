import React, { useEffect, useState } from "react";
import HomeContainer from "../../containers/home/homeContainer";
import { isExpired, decodeToken } from "react-jwt";
import { StyledHome } from "./style";

const HomePage = () => {
  const token = window.localStorage.getItem("dataUser");
  let [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.user_rol == "admin") {
        window.location.href = "/admin";
        setDecodedToken(false);
      } else {
        setDecodedToken(true);
      }
    }
  });

  return (
    <div>
      {(token == null || (token && decodedToken == true)) && (
        <StyledHome>
          <HomeContainer />
        </StyledHome>
      )}
    </div>
  );
};

export default HomePage;
