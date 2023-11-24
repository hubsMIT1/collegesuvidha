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
      history,
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
          history,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await userData(id, accessToken, refreshToken,dispatch);
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
  console.log("refreshToken", refreshToken);
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
  history,
  dispatch
) => {
  if (response?.status === 200) {
    return response;
  } else if (response === "") {
    try {
      const res = await handleRefreshToken(id, refreshToken, dispatch);
      console.log(res);
      return res;
    } catch (err) {
      // Redirect to login page if refresh token fails
      return err;
    }
  }
  return response;
};

const authService = {
  userData,
  handleRefreshToken,
  handleApiResponse,
  getSellerById,
};

export default authService;
