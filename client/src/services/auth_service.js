import { callAuthApi } from "../utils/CallApi";
import { history } from "../_helpers/history";
import { setAuthStore, setUserDataStore } from "../redux/allAction";

const userData = async (id, accessToken, refreshToken, dispatch) => {
  // Use the handleApiResponse function to handle the response
  try {
    const response = await callAuthApi.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response);
    const handledResponse = await handleApiResponse(
      response,
      id,
      refreshToken,
      dispatch
    );

    if (handledResponse?.status === 200) {
      setUserDataStore(handledResponse.data, dispatch);
      return handledResponse;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await handleApiResponse(
          "",
          id,
          refreshToken,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await userData(id, handledResponse.data.accessToken, handledResponse.data.refreshToken,dispatch);
        return handledResponse;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
};

const getSellerById = async (id) => {
  try {
    const response = await callAuthApi.get(`/seller/${id}`);
    if (response?.status === 200) {
      return response;
    }
  } catch (err) {
    return err.message;
  }
};

const handleRefreshToken = async (id, refreshToken, dispatch) => {
  // console.log("refreshToken", refreshToken);
  try {
    const res = await callAuthApi.post(
      `/refresh-token/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (res.status === 200) {
      setAuthStore(res.data, dispatch);
      return res;
    }
  } catch (error) {
    // if(error?.response?.status === 401)
    //   return <Navigate to={'/auth/login'} />

    return error;
  }
};

const handleApiResponse = async (
  response,
  id,
  refreshToken,
  dispatch
) => {
  if (response?.status === 200) {
    return response;
  } else if (response === "") {
    try {
      const res = await handleRefreshToken(id, refreshToken, dispatch);
      // console.log(res);
      return res;
    } catch (err) {
      // Redirect to login page if refresh token fails
      return err;
    }
  }
  return response;
};
const handleRegistration = async(route,data) =>{
  try{

    const res = await callAuthApi.post(`/${route}`, data, {
        withCredentials: true, // equivalent to credentials: 'include'
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return res;
  }
  catch(err){
    console.log(err.message)
  }
};
const handleProfileUpdate = async(data,userId,accessToken,refreshToken,dispatch)=>{
  try{
    const res = await callAuthApi.put(`/update/${userId}`,data,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // if(res?.status===200){setUserDataStore(res.data, dispatch); return res.data;}
    // console.log(res?.message)
    const handledResponse = await handleApiResponse(
      res,
      userId,
      refreshToken,
      dispatch
    );

    if (handledResponse?.status === 200) {
      setUserDataStore(handledResponse.data, dispatch);
      return handledResponse.data;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await handleApiResponse(
          "",
          userId,
          refreshToken,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await handleProfileUpdate(userId, handledResponse.data.accessToken, handledResponse.data.refreshToken,dispatch);
        return handledResponse.data;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
};
const addNewAdminHandler = async(adminId,userId,accessToken,refreshToken,dispatch)=>{
  try{
    const res = await callAuthApi.post(`/add-admin`,adminId,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // if(res?.status===200){setUserDataStore(res.data, dispatch); return res.data;}
    // console.log(res?.message)
    const handledResponse = await handleApiResponse(
      res,
      userId,
      refreshToken,
      dispatch
    );

    if (handledResponse?.status === 200) {
      setUserDataStore(handledResponse.data, dispatch);
      return handledResponse.data;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await handleApiResponse(
          "",
          userId,
          refreshToken,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await addNewAdminHandler(adminId,userId, handledResponse.data.accessToken, handledResponse.data.refreshToken,dispatch);
        return handledResponse.data;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
}
const authService = {
  userData,
  handleRefreshToken,
  handleApiResponse,
  getSellerById,
  handleRegistration,
  handleProfileUpdate,
  addNewAdminHandler
  

};

export default authService;
