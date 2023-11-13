import axios from "axios";
import { callAuthApi } from "../utils/CallApi";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, clearUserData } from "../redux/userData/userAction";

import { history } from "../_helpers/history";
const API_URL = "/auth";

// const register = (data)=>{

// }
const userData = async (id, accessToken, refreshToken, dispatch) => {
  try {
    const response = await callAuthApi.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);

    if (response.status === 200) {
      return response;
    } else {
      // Handle other errors, e.g., unauthorized access
      return response.status;
    }
  } catch (error) {
    // Handle network errors or other exceptions
    if (error?.response?.status === 401) {
      console.log(error?.response?.status);

      // JWT expired, attempt to refresh the token
      try {
        const res = await handleRefreshToken(id, refreshToken);
        console.log(res, "refreshToekenen");
        return res;
      } catch (err) {
        return (
          <Navigate
            login={true}
            to="/auth/login"
            state={{ from: history.location }}
          />
        );
      }
    }
    return error.message;
  }
};
const handleRefreshToken = async (id, refreshToken) => {
  console.log(id, refreshToken, "refreshFunction token");
  try {
    // Make a request to refresh the token using the refresh token
    const response = await callAuthApi.post(
      `/refresh-token/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      const { accessToken, refreshTokens } = response.data;
      console.log(accessToken, "refre");
      const againUserDataRes = await userData(id, accessToken, refreshTokens);
      return againUserDataRes;
    } else {
      return (
        <Navigate
          login={true}
          to="/auth/login"
          state={{ from: history.location }}
        />
      );
    }
  } catch (error) {
    return error.message;
  }
};
// const signup = (email,password)=>{
//     return axios.post(API_URL+"/signup",{
//         email,
//         password,
//     }).then((response)=>{
//         if(response.data.accessToken){
//             localStorage.setItem("user", JSON.stringify(response.data));

//         }
//         return response.data;
//     })
// }

// const login = (email,password)=>{
//     return axios.post(API_URL + "/login",{
//         email,
//         password,
//     }).then((response)=>{
//         if(response.data.accessToken){
//             localStorage.setItem("user",JSON.stringify(response.data))
//         }
//         return response.data;
//     })
// }
// const logout = () =>{
//     localStorage.removeItem("user")
// }

// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));

// }

const authService = {
  userData,
  handleRefreshToken,
};

export default authService;
