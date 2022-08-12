import styled from "styled-components";
import tw from "twin.macro";

export const BotonCerrar = styled.button`
  ${tw`absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white`};
`;

export const Input = styled.input`
  ${tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`};
`;

export const BotonAceptar = styled.button`
  ${tw`mt-10  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`};
`;

export const Label = styled.label`
  ${tw`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`};
`;
