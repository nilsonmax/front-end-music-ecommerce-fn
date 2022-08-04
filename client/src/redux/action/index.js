const axios = require('axios');
// const { REACT_APP_HOST } = process.env;

// import { applyMiddleware } from "redux";

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
export const get_instrumentID = (id) => {
    return async function (dispatch) {
        try {
            let api = await axios.get("http://localhost:4000/instruments/" + id)

            return dispatch({
                type: GET_DETAILS_INSTRUMENTS,
                payload: api.data
            })
        } catch (error) {
            console.log("error in redux/action/get_instrumentID : " + error)
            return "error in redux/action/get_instrumentID : " + error
        }

    }
}