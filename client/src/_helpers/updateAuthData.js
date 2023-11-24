import { loginSuccess, logout } from '../redux/authAction';
// import { useDispatch } from 'react-redux';
export const updateAuthData = (accessToken, refreshToken, userId) => {
    // dispatch(loginSuccess(accessToken,refreshToken, userId));
    console.log(accessToken)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
   
};