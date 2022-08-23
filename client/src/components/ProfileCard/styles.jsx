import styled from "styled-components";
import tw from "twin.macro";

export const Caption = styled.div`
  transform:translateY(-90px);
  ${tw`
    text-center
    opacity-0
    duration-[0.6s]
  `}
  h3{
    ${tw`
    text-[21px]
    `}
  }
  p{
    ${tw`
      text-sm
      text-white
      mt-0.5
      mb-[9px]
      mx-0
      rounded-[10rem]
      p-[0.4rem]
    `}
  }
  `;

export const SocialLinks = styled.div`
  ${tw`
    flex 
    flex-wrap
    justify-center
  `}
  a{
    ${tw`
      text-[rgba(0, 0, 0, 0.779)]
      mr-2
      text-[21px]
      duration-[0.6s]
    `}
  }
  a:hover{
    ${tw`
      text-[rgb(0, 132, 255)]
    `}
  }
`;
export const ImageProfileCardContainer = styled.div`
  ${tw`
    relative 
    w-full
    h-full
    duration-[0.6s]
    z-[1]
  `}
  img{
    ${tw` 
    w-full
    rounded-[50%]
    duration-[0.6s]
    bg-[rgba(0, 0, 0, 0.893)]
  `}
  }
`;

export const ImageProfileCard = styled.img`
  ${tw`
    w-full
    rounded-[50%]
    duration-[0.6s]
    bg-[rgba(0, 0, 0, 0.893)]
  `}
  box-shadow: 0 0 22px #3336;
`;

export const ProfileCardContainer = styled.div`
  ${tw`
    relative
    w-[220px]
    h-[220px]
    bg-[#fff]
    p-[30px]
    rounded-[50%]
    duration-[0.6s]
    m-8
    cursor-pointer
  `}
  box-shadow: 0 0 22px #3336;
&:hover{
  ${tw`
      /* sm:h-[150px] */
      rounded-[10px]
      h-[260px]
      bg-gradient-to-r from-[ rgb(216,31,147)]to-[rgb(65,52,146)]
      `}
  }
  box-shadow: 0 0 22px #3336;
  &:hover ${Caption} {
    ${tw`
    opacity-100
    `}
  }
  &:hover ${ImageProfileCardContainer} {
    transform:translateY(-60px);
  }
  &:hover ${ImageProfileCard} {
    ${tw`
    rounded-[10px] 
    `}
  }
`;



