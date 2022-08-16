import styled from "styled-components";
import tw from "twin.macro";

export const StyledCard = styled.div`
  ${tw`
    h-56
    rounded-lg
    border-tertiary
    overflow-hidden
    p-2
    m-1 
    bg-background
    max-w-md
    grid gap-0.5 
    grid-cols-6
    leading-tight
    relative
    transition-all duration-500
    scale-y-75
    hover:scale-y-100
  `};

  img {
    ${tw`
      place-content-center
      justify-center
      row-span-5
      max-h-48
      self-auto
      border-0
      border-secondary
      m-0
      col-span-3
      block
      `};
  }

  h2 {
    ${tw`
      col-span-3
      m-0
      p-0
      font-bold    
    `};
  }

  h3 {
    ${tw`
        text-highlight
        font-bold
        col-span-2
      `}
  }

  h4 {
    ${tw`
      bg-orange-300
      p-1
      m-0
      rounded-full
      text-center
      font-bold
      text-sm
      flex-1
    `}
  }

  p {
    ${tw`
      pt-2
      leading-tight
      text-xs
      col-span-3
      text-tertiary
      `}
  }

  span {
    ${tw`
      m-0
      p-0
      col-span-2
      row-span-1
    `}
  }
`;

export const StyledButton = styled.figure`
  ${tw`
    absolute
    bottom-0
    right-32
    bg-highlight
    p-1
    pr-10
    m-2
    border-0
    border-secondary
    rounded-md
  `};
`;
