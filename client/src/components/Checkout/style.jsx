import styled from "styled-components";
import tw from "twin.macro";

export const StyledCheckout = styled.div`
  ${tw`
    flex justify-center items-start flex-wrap
    lg:col-span-5 shadow top-2
  `}
`;

export const StyledResume = styled.div`
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
