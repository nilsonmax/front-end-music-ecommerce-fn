import styled from 'styled-components';
import tw  from 'twin.macro';

export const Container = styled.div`
${tw `flex flex-col items-center w-screen h-auto`}`

export const MainContainer = styled.div`
${tw `flex flex-col items-center w-2/4 p-2`}`

export const Title = styled.h2`
${tw `m-4 text-[#0A0A0A] text-3xl font-bold`}`

export const Required = styled.div`
${tw `flex items-start w-full`}`

export const FormContainer = styled.form`
  ${tw `flex flex-col `};`;

export const SixItemsContainer = styled.div`
${tw `flex flex-wrap justify-around`}`;

export const ThreeItemsContainer = styled.div`
${tw `flex flex-col justify-around m-2`}`;

export const SubmitButton = styled.button`
${tw `py-1.5 rounded-md bg-[#F37042] text-white`}`

export const InputUp = styled.input`
${tw `p-1 my-1.5 border rounded-md placeholder-[#0A0A0A] border-[#0A0A0A]`}`

export const InputDown = styled.input`
${tw `w-full p-1 my-1.5 border rounded-md placeholder-[#0A0A0A] border-[#0A0A0A]`}`

export const Select = styled.select`
${tw `p-1 border rounded-md border-[#0A0A0A]`}`



