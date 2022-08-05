import {
    GET_INSTRUMENTS,
    GET_DETAILS_INSTRUMENTS,
    DATA_CLEAR,
    POST_CREATE,
    GET_BY_NAME,
    GET_ALL_CATEGORIES
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
                instruments: action.payload,
                copy: action.payload
            }

        case GET_DETAILS_INSTRUMENTS:
            return {
                ...state,
                detail: action.payload
            }

        case GET_BY_NAME:
            console.log(action.payload, ' payload' , action.type, 'type')
            return {
                ...state,
                instruments: action.payload
            }

        case DATA_CLEAR:
            return {
                ...state,
                detail: {}
            }

        case POST_CREATE:
            return {
                ...state,
                instruments: [...state.copy, action.payload]
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                category: action.payload
            }

        default:
            return state
    }
}

export default reducer;