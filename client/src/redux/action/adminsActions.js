import axios from "axios";


export const GET_ADMINS = "GET_INSTRUMENTS";
const REACT_APP_HOST = "http://localhost:4000";

export const getAdmins = () => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:4000/admins`)
      .then((resp) => {
        dispatch({
          type: GET_ADMINS,
          payload: resp.data,
        });
      })
      .catch((error) => {
        throw new TypeError(error.response.data);
      });
  };
};

export const deleteAdmin = (user_id) => {
  return async function () {
    try {
      let userDeleted = await axios.delete(
        `http://localhost:4000/users/${user_id}`
      );
      return userDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const putAdmin = (objectUser, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let newUser = await axios.put("http://localhost:4000/users/admin", objectUser, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};
