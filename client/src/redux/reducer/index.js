import {
    GET_INSTRUMENTS,
    GET_DETAILS_INSTRUMENTS,
    DATA_CLEAR,
    POST_CREATE
} from '../action/index.js'

const initialState = {
    instruments: [],
    copy: [],
    detail: {},
    category: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INSTRUMENTS:
            return {
                ...state,
                videogame: action.payload,
                copy: action.payload
            }

        case GET_DETAILS_INSTRUMENTS:
            return {
                ...state,
                detail: action.payload
            }

        case DATA_CLEAR:
            return {
                ...state,
                detail: {}
            }

        case POST_CREATE:
            return {
                ...state,
                videogame: [...state.copy, action.payload]
            }

          default:
            return state
    }
}

export default reducer;