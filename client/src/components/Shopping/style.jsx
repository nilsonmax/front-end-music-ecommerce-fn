import styled from 'styled-components';
import tw from 'twin.macro';


const button = tw`w-full max-w-[400px] py-[10px] px-3 rounded-[15px] border-none text-xl mt-[10px] uppercase bg-secondary text-white cursor-pointer scale-100 transform ease-in duration-500`


export const CartWrapper = styled.div`
  ${tw`
  w-screen
  bg-blur
  fixed
  right-0
  top-0
  `}
  z-index: 100;
  transition: all 1s ease-in-out;
  `;

export const CartContainer = styled.div`
  ${tw`
  h-screen
  w-[600px]
  bg-white
  float-right
  px-[10px] 
  py-10
  relative
  `}
  
  `;

export const CartHeading = styled.button`
  ${tw`
  text-secondary
  flex
  items-center
  text-lg
  font-medium
  cursor-pointer
  gap-0.5
  ml-[10px]
  border-none
  bg-transparent
  `}
  `;

export const Heading = styled.span`
  ${tw`
  ml-[10px]
  `}
  `;
export const EmptyCart = styled.div`
  ${tw`
  text-secondary
  m-10
  text-center
  `}
  & > h3 {
    ${tw`
    text-lg
    font-semibold
    `}
  }
  `;
  
export const ContinueShopping = styled.button([
  button
]);
export const PayBtn = styled.button([
  button
]);

export const ProductContainer = styled.div`
${tw` 
mt-[10px] overflow-auto max-h-[70vh] px-5 py-[10px]
`}
`;
export const CartNumItems = styled.span`
${tw`
ml-[10px]
`}
`;

export const Hidden = styled.div`
${tw`
hidden
`}`;

export const Product = styled.div`
${tw`
flex
gap-[30px]
p-5
`}`;

export const ItemDescription = styled.div`
${tw`
flex
justify-between
w-[350px]
text-primary
`}`;

export const ItemImage = styled.img`${tw`
  w-[180px]
  h-[150px]
  rounded-[15px]
  bg-white
`}`

export const Top = styled.div`
${tw`
flex-wrap
gap-2.5
`}`;

export const Bottom = styled.div`
${tw`
mt-[30px]
justify-between
`}`;

export const QuantityDesc = styled.p`
${tw`
flex
border border-gray-500
p-1.5
`
}`;

export const QuantityDescMinus = styled.span`
${tw`
flex
text-base
py-1.5
px-3
cursor-pointer
text-red-500
border-r border-gray-500
`
}`;

export const QuantityDescPlus = styled.span`
${tw`
flex
text-base
py-1.5
px-3
cursor-pointer
text-green-500

`
}`;
export const QuantityDescNumCart = styled.span`
${tw`
px-3
flex
text-xl
text-purple-600
border-r border-gray-500
`
}`;

export const RemoveItemButton = styled.button`${tw`
flex
  text-2xl
  text-red-500
  cursor-pointer
  bg-transparent
  border-none
`}`

export const CartBottom = styled.div`${tw`
  absolute
  bottom-3
  right-1.5
  w-full
  py-[30px]
  px-[65px]
`}`

export const Total = styled.div`${tw`
  flex
  justify-between
`}`

export const SubTotal = styled.h3`${tw`
  text-xl
  text-purple-600
`}`
export const TotalPrice = styled.h3`${tw`
  text-xl
  text-red-500
`}`

export const BtnContainer = styled.div`
${tw`
  w-[300px]
  m-auto
`}`;



