import React from "react";
import { ButtonStyled } from "./styled";

const Buttons = ({ text, onClick }) => {
  return <ButtonStyled type="button" onClick={onClick}>{`${text}`}</ButtonStyled>;
};

export default Buttons;
