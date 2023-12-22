import  {loginSuccess, logout} from './authData/authAction';
import {clearUserData,setUserData} from './userData/userAction';
import {clearProductData,setProductData} from './productData/productAction';

export const setAuthStore = (data,dispatch) =>{
    const {accessToken,refreshToken,userId} = data;
    dispatch((loginSuccess(accessToken,refreshToken,userId)));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId',userId);
}
export const logoutAuthStore = (dispatch)=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
}
export const setUserDataStore = (data,dispatch)=>{
    dispatch(setUserData(data));
}
export const clearUserDataStore = (dispatch)=>{
    dispatch(clearUserData());
    
}
export const setProductStore = (data, dispatch)=>{

    dispatch(setProductData(data));
    console.log(data);

}
export const clearProductStore = (dispatch)=>{
    dispatch(clearProductData());
}