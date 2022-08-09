import styled from 'styled-components';
import tw from 'twin.macro'

export const StyledNav = styled.nav`
  ${tw`
    flex items-center
    gap-2
    max-h-12
    items-center
  `}
    
    li {
      ${tw`
      bg-background
      content-start
      flex
      p-2
      m-1
    `}
  }
`;