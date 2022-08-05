import styled from 'styled-components';
import tw from 'twin.macro'

export const NavContainer = styled.nav`
  ${tw`w-full shadow `};
`;

export const Button = styled.button`
  ${tw`
  p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border
  `}
`;

export const DivJustifyBetween = styled.div`
  ${tw`
  justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8
  `}
`; 

export const DivItemsCenter = styled.div`
  ${tw`
  flex items-center justify-between py-3 md:py-5 md:block
  `}
`;

export const Li = styled.li`
  ${tw`
  font-bold transition duration-150 border-b-2 border-transparent hover:border-purple-600
  `}
`;
