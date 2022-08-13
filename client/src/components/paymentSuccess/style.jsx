import styled from 'styled-components';
import tw from 'twin.macro';


export const SuccessWrapped  = styled.div`
  ${tw`
    bg-white
    p-[50px]
    h-full
  `}
`;

export const SuccessW = styled.div`
  ${tw`
    w-[1000px]
    m-auto
    mt-40
    bg-tertiary
    p-[50px]
    rounded-[15px]
    flex
    justify-center
    items-center
    flex-col
  `}

  & > h2 {
    ${tw`
      capitalize
      mt-[15px]
      font-black
      text-[40px]
      text-white
    `}
  }
`;

export const Icon  = styled.p`
  ${tw`
    text-green-500
    text-[40px]
  `}
`;
export const EmailMsg  = styled.p`
  ${tw`
    text-base
    font-semibold
    text-center
  `}
`;
export const Description  = styled.p`
  ${tw`
    text-base
    font-semibold
    text-center
    m-2.5
    mt-[30px]
  `}

  & > a {
    ${tw`
      ml-[5px]
      text-[#f02d34]
    `}
  }
`;