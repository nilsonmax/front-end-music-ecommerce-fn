import React from 'react'
import { getByName} from '../../redux/action';
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

        <SearchContainer >
            <SubSearchContainer>
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type="text" className="px-4 py-2 w-80"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={name}
                        autoComplete='off'
                    />
                </form>
                <ButtonSearch onClick={handleSubmit} type='submit' value=''>
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </ButtonSearch>
            </SubSearchContainer>
        </SearchContainer>
    )
}