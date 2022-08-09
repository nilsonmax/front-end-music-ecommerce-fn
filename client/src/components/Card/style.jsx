import styled from 'styled-components';
import tw from 'twin.macro'

export const StyledCard = styled.div`
  ${tw`
    h-full
    rounded-lg
    overflow-hidden
    p-2
    m-0 
    max-w-sm 
    grid-cols-3 
    gap-1
    bg-background
    max-w-md
    grid gap-1 
    grid-cols-4
    leading-tight
    relative
    shadow-lg
    transition-all duration-500
    scale-y-75
  `};
    
    
    img {
      ${tw`
      place-content-center
      justify-center
      row-span-6
      max-h-56
      self-auto
      border-0
      border-secondary
      m-0
      col-span-2
      `};
    }

    h2 {
      ${tw`
      col-span-2
      m-0
      p-0
      font-bold    
    `};
  }
    
  h4 {
    ${tw`
      bg-orange
      p-1
      m-0
      rounded-full
      text-center
      font-bold
      text-sm
      flex-1
      justify-center
      
    `}
  }

  p {
    ${tw`
      leading-tight
      text-xs
      col-span-2
      text-tertiary
    `}
  }

  span {
    ${tw`
      m-0
      p-0
    `}
  } 

`

export const StyledButton = styled.figure`
  ${tw`
    absolute
    bottom-0
    right-48
    bg-highlight
    p-1
    m-2
    border-0
    border-secondary
    rounded-md
  `};
`