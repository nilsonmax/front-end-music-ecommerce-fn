import React from "react";
import { ButtonStyled } from "./styled";

const Buttons = ({ text }) => {
  return <ButtonStyled type="button">{`${text}`}</ButtonStyled>;
};

export default Buttons;
