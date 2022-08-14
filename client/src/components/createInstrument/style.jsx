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
${tw `py-1.5 rounded-md bg-[#F37042] text-background font-semibold hover:p-2.5`}`

export const InputUp = styled.input`
${tw `p-1 my-1.5 border-[0.5px] rounded-md placeholder-[#0A0A0A] border-tertiary hover:border-[#F37042] hover:shadow-md shadow-[#F37042]`}`

export const InputDown = styled.input`
${tw `w-full p-1 my-1.5 border-[0.5px] rounded-md placeholder-[#0A0A0A] border-tertiary hover:border-darkconrflower hover:shadow-md shadow-[#F37042]`}`

export const Select = styled.select`
${tw `p-1 border rounded-md border-bluemunsell hover:border-[#F37042] hover:shadow-md shadow-[#F37042]`}`

export const TextArea = styled.textarea`
${tw `w-full p-1 my-1.5 border-[0.5px] rounded-md border-bluemunsell placeholder-[#0A0A0A] hover:border-darkconrflower hover:shadow-md shadow-[#F37042]`}`



