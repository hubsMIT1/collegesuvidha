// import { setUserData, clearUserData } from "./userReducer";
// import { loginSuccess, logout } from '../authAction';
// import { callAuthApi } from "../../utils/CallApi";
// // import { useSelector } from 'react-redux';

// export const fetchUserData = () => async (dispatch, getState) => {
//     // const { isAuthenticated, userId } = useSelector((state) => state.auth);

//   try {
//     const { accessToken,userId } = getState().auth;
//     const id = userId;
//     // Make a request to your API to get user data using the refresh token
//     const response = await callAuthApi.get(`/auth/user/${id}`, 
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             },
//         }
//       );
        
//     if (response.ok) {
//       const userData = await response.json();
//       dispatch(setUserData(userData)); // Dispatch the synchronous action to update user data in the store
//     } else {
//       // Handle error, e.g., logout the user
//       dispatch(logout()); // Assume there is a logout action in authActions.js
//       dispatch(clearUserData());
//       sessionStorage.removeItem("accessToken");
//       sessionStorage.removeItem("refreshToken");
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// };
export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: { userData },
});

export const clearUserData = () => ({
  type: 'CLEAR_USER_DATA',
});