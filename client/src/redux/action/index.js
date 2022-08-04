import axios from 'axios';

export const GET_INSTRUMENTS = "GET_INSTRUMENTS";
export const GET_DETAILS_INSTRUMENTS = "GET_DETAILS_INSTRUMENTS";
export const POST_CREATE = "POST_CREATE";
export const DATA_CLEAR = "DATA_CLEAR";
export const GET_BY_NAME = "GET_BY_NAME";


// const { REACT_APP_HOST } = process.env;
const REACT_APP_HOST = 'http://localhost:4000';
console.log(REACT_APP_HOST, 'url')

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            console.log(REACT_APP_HOST, 'url', name , 'name')
            const resp = await axios.get(`${REACT_APP_HOST}/instruments?name=${name}`)
           console.log(resp.data, 'resp.data')
            return dispatch({
                type: GET_BY_NAME,
                payload: resp.data
            })

        } catch (error) {
            console.log(error, 'error resp.data')
        }
    }
}

export const getDataClear = (payload) => {
    return {
        type: DATA_CLEAR,
        payload
    }
}