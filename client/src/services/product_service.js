import { callProductApi } from "../utils/CallApi";
import authService from "./auth_service";
import { history } from "../_helpers/history";

export const createProduct = async (
  productData,
  id,
  accessToken,
  refreshToken,
  dispatch
) => {
  try {
    const response = await callProductApi.post(`/`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const handledResponse = await authService.handleApiResponse(
      response,
      id,
      refreshToken,
      history,
      dispatch
    );
    console.log(handledResponse);

    if (handledResponse?.status === 200) {
      return handledResponse;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await authService.handleApiResponse(
          "",
          id,
          refreshToken,
          history,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await createProduct(
            productData,
            id,
            handledResponse.data.accessToken,
            handledResponse.data.refreshToken,
            dispatch
          );
        return handledResponse;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
};

export const getProducts = async (
  page,
  categories,
  sort
) => {
  try {
    const response = await callProductApi.get(`/?page=${page}&category=${categories}&sort=${sort?.id}&order=${sort?.order}`);
    if (response.status === 200) {
      return response;
    } else {
      return response.message;
    }
  } catch (err) {
    return err;
  }
};

export const getProductsById = async (
  page,
  productId,
  categories,
  sort
) => {
  try {
    const response = await callProductApi.get(`/${productId}?page=${page}&category=${categories}&sort=${sort?.id}&order=${sort?.order}`);
    if (response?.status === 200) {
      return response;
    } else return response.message;
  } catch (err) {
    return err;
  }
};
export const getProductsByUserId = async (
  page,
  sellerId
) => {
  try {
    const response = await callProductApi.get(
      `/seller-product/${sellerId}?page=${page}`
    );
    if (response?.status === 200) {
      return response;
    } else return response.message;
  } catch (err) {
    return err;
  }
};

export const updateProduct = async (
  productId,
  productData,
  id,
  accessToken,
  refreshToken,
  dispatch
) => {
  try {
    const response = await callProductApi.put(`/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const handledResponse = await authService.handleApiResponse(
      response,
      id,
      refreshToken,
      history,
      dispatch
    );

    if (handledResponse?.status === 200) {
      return handledResponse;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await authService.handleApiResponse(
          "",
          id,
          refreshToken,
          history,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await updateProduct(
            productId,
            productData,
            id,
            handledResponse.data.accessToken,
            handledResponse.data.refreshToken,
            dispatch
          );
        return handledResponse;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
};

export const deleteProduct = async (
  productId,
  id,
  accessToken,
  refreshToken,
  dispatch
) => {
  try {
    const response = await callProductApi.delete(`/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const handledResponse = await authService.handleApiResponse(
      response,
      id,
      refreshToken,
      history,
      dispatch
    );

    if (handledResponse?.status === 200) {
      return handledResponse;
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      try {
        const handledResponse = await authService.handleApiResponse(
          "",
          id,
          refreshToken,
          history,
          dispatch
        );
        if (handledResponse?.status === 200)
          return await deleteProduct(
            productId,
            id,
            handledResponse.data.accessToken,
            handledResponse.data.refreshToken,
            dispatch
          );
        return handledResponse;
      } catch (error) {
        return error;
      }
    }
    return err;
  }
};
