import axios from "axios";


export const GET_ADMINS = "GET_ADMINS";
const REACT_APP_HOST = "http://localhost:4000";

export const getAdmins = (token) => {
  return async function (dispatch) {
    let tokenJSON = JSON.parse(token);
    return await axios
      .get(`http://localhost:4000/admins`, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        }})
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

export const deleteAdmin = (admin_id, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let adminDeleted = await axios.delete(
        `http://localhost:4000/admins`,{data: {
            id: admin_id
          },
            headers: {
              Authorization: "Bearer " + tokenJSON.token,
            }
        }
      );
      return adminDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const putAdmin = (objectAdmin, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let admin = await axios.put("http://localhost:4000/admins", objectAdmin, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return admin.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};


export const postAdmin = (objectAdmin, token) => {
    return async function () {
        try {
        let tokenJSON = JSON.parse(token);
        let newAdmin = await axios.post("http://localhost:4000/admins/register", objectAdmin, {
          headers: {
            Authorization: "Bearer " + tokenJSON.token,
          },
        });
        return newAdmin.data;
      } catch (error) {
        var errorRes = error.response.data.error;
        if (!errorRes) {
          errorRes = error.response.data;
        }
        throw new TypeError(errorRes);
      }
    };
  };