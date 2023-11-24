export const setProductData = (productData) => ({
  type: "SET_PRODUCT_DATA",
  payload: { productData },
});

export const clearProductData = () => ({
  type: "CLEAR_PRODUCT_DATA",
});
