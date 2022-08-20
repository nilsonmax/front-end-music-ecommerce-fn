import styled from 'styled-components';
import tw from 'twin.macro'

export const StyledNav = styled.nav`
  ${tw`
    flex items-center justify-center gap-0 max-h-10 list-none
  `}
`;

export const StyledLi= styled.li`
  ${tw`
  py-1
  px-3
  m-1
  flex
  text-center
  rounded
  shadow
  
  hover:border-b-2
  hover:border-bluemunsell
  cursor-pointer
  active:rounded-md
  active:bg-bluemunsell
  active:px-4
  active:py-1.5
`}
`;

