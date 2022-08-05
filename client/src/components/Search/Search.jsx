import React from 'react'
import { getByName } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { ButtonSearch, SearchContainer, SubSearchContainer } from "./style";
import { useState } from 'react';

export const Search = () => {

    const dispatch = useDispatch()
    const [name, SetName] = useState("");

    // useEffect(() => {dispatch(getInstruments())})

    const handleChange = (e) => {
        e.preventDefault()
        SetName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getByName(name))
        SetName('')
    }

    return (
        <>
        
          <SearchContainer >
                <SubSearchContainer>
                <div className="relative">
                <form action=''  onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="block w-full pl-11 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    onChange={handleChange}
                    value={name}
                /> 
                 </form> 
                <button className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" onClick={handleSubmit} type='submit' value=''>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                </button>
                </div>
                
               {/* <button className="px-4 text-white bg-purple-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button> */}
                
                </SubSearchContainer>
            </SearchContainer>
           
          
        </>
    )
}