import styled from 'styled-components';
import tw  from 'twin.macro'

export const SearchContainer = styled.nav`
  ${tw `flex items-center justify-center p-2 w-full`};
`;

export const SubSearchContainer = styled.button`
  ${tw`
  flex border-2 rounded
  `}
`;

export const ButtonSearch = styled.button`
  ${tw`
  flex items-center justify-center px-4 border-l w-full
  `}
`;
