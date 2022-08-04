// const axios = require('axios');
// const { REACT_APP_HOST } = process.env;

export const GET_INSTRUMENTS = "GET_INSTRUMENTS";
export const GET_DETAILS_INSTRUMENTS = "GET_DETAILS_INSTRUMENTS";
export const POST_CREATE = "POST_CREATE";
export const DATA_CLEAR = "DATA_CLEAR";


export const getDataClear = (payload) => {
    return {
        type: DATA_CLEAR,
        payload
    }
}