import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`flex flex-col items-center h-auto`}
`;

export const MainContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

export const Title = styled.h2`
  ${tw`text-[#2B4570] text-3xl font-bold`}
`;

export const Required = styled.div`
  ${tw`flex items-start`}
`;

export const FormContainer = styled.form`
  ${tw`flex flex-col `};
`;

export const SixItemsContainer = styled.div`
  ${tw`flex flex-wrap justify-around`}
`;

export const ThreeItemsContainer = styled.div`
  ${tw`flex flex-col justify-around m-2`}
`;

export const SubmitButton = styled.button`
  ${tw`py-1.5 rounded-md bg-[#2B4570] text-background font-semibold hover:p-2.5`}
`;

export const InputUp = styled.input`
  ${tw`p-1 my-1.5 border rounded-md outline-none placeholder-[#0A0A0A] border-[#5497A7] focus:border-[#2B4570] focus:py-2 focus:px-4 focus:shadow-[#2B4570] focus:shadow-md shadow-[#2B4570]`}
`;

export const InputDown = styled.input`
  ${tw`w-full p-1 my-1.5 border rounded-md outline-none placeholder-[#0A0A0A] border-[#5497A7] focus:border-[#2B4570] focus:py-2 focus:px-4 focus:shadow-[#2B4570] focus:shadow-md shadow-[#2B4570]`}
`;

export const Select = styled.select`
  ${tw`p-1 border rounded-md border-[#5497A7] focus:border-[#2B4570] focus:py-2 focus:px-4 focus:shadow-[#2B4570] focus:shadow-md shadow-[#2B4570]`}
`;

export const TextArea = styled.textarea`
  ${tw`w-full p-1 my-1.5 border rounded-md border-[#5497A7] outline-none placeholder-[#0A0A0A] focus:border-[#2B4570] focus:py-2 focus:px-4 focus:shadow-[#2B4570] focus:shadow-md shadow-[#2B4570]`}
`;

export const ButtonAceptar = styled.button`
  ${tw`text-white bg-secondary hover:bg-primary cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`};
`;

export const ButtonCancelar = styled.button`
  ${tw`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`};
`;
