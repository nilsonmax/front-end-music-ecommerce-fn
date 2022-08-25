import styled from "styled-components";
import tw from "twin.macro";

export const StyledCard = styled.div`
  ${tw`
    h-40
    rounded-lg
    overflow-hidden
    p-0
    m-2
    pt-4 
    bg-background
    grid gap-0.5 
    grid-cols-6
    leading-tight
    relative
    max-w-md
    border-solid
    border-white
    scale-100
    hover:shadow-2xl
    hover:scale-125
  `};

  img {
    ${tw`
      place-content-center
      justify-center
      row-span-5
      max-h-36
      self-auto
      border-0
      border-secondary
      m-0
      col-span-2
      block
      hover:opacity-90
      `};
  }

  h2 {
    ${tw`
      col-span-4
      m-0
      p-0
    `};
  }

  h3 {
    ${tw`
        font-bold
        col-span-2
        text-2xl
      `}
  }

  h4 {
    ${tw`
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
      p-0
      leading-tight
      text-xs
      col-span-4
      flex
      `}
  }

  span {
    ${tw`
      m-0
      p-0
      col-span-1
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
