import styled from "styled-components";
import tw from "twin.macro";

const button = tw`w-auto py-[10px] px-3 rounded-[15px] border-none text-xl mt-[10px] uppercase bg-secondary text-white cursor-pointer scale-100 transform ease-in duration-500`;

export const ButtonStyled = styled.button([button]);

export const StyledCard = styled.div`
  ${tw`
    bg-primary
  `}
`;
