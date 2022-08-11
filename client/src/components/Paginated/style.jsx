import styled from 'styled-components';
import tw from 'twin.macro'

export const StyledNav = styled.nav`
  ${tw`
    flex items-center justify-center gap-0 max-h-10
  `}
`;
export const Li= styled.li`
  ${tw`
  py-1
  px-2
  m-2
  flex
  text-center

  hover:border-b-2
  hover:border-secondary

  active:rounded-md
  active:bg-secondary
  active:px-3.5
  active:py-1.5
`}
`;
