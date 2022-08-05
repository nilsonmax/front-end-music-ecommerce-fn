import axios from 'axios';

// import { applyMiddleware } from "redux";

export const GET_INSTRUMENTS = "GET_INSTRUMENTS";
export const GET_DETAILS_INSTRUMENTS = "GET_DETAILS_INSTRUMENTS";
export const POST_CREATE = "POST_CREATE";
export const DATA_CLEAR = "DATA_CLEAR";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';


// const { REACT_APP_HOST } = process.env;
const REACT_APP_HOST = 'http://localhost:4000';
console.log(REACT_APP_HOST, 'url')

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            // const resp = await axios.get(`${REACT_APP_HOST}/instruments?name=${name}`)
            const resp = await axios.get(`http://localhost:4000/instruments?name=${name}`)
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

export const getInstruments = () => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:4000/instruments`)
        .then(rAxios => {
            dispatch({
                type: GET_INSTRUMENTS,
                payload: rAxios.data
            })
        }).catch (error => {
            console.log("error in redux/action/getInstruments : " + error)
            return "error in redux/action/getInstruments : " + error
        }) 
    }
}

export const getAllCategories = () => {
    return async function(dispatch){
        try {
            let categories = await axios.get('http://localhost:4000/category/all')
            console.log("CATEGORIES", categories)

            return dispatch({
                type: "GET_ALL_CATEGORIES",
                payload: categories.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const postInstrument = (payload) => {
    return async function(dispatch){
        try {
            let newInstrument = await axios.post('http://localhost:4000/instruments', payload)
            console.log("NEWINSTRUMENT", newInstrument)

        } catch (error) {
            console.log(error)
        }
    }
}