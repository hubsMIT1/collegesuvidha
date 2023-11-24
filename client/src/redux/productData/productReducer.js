const initialState = {
  productData: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCT_DATA":
      return {
        ...state,
        productData:  action.payload.productData,
      };
    case "CLEAR_PRODUCT_DATA":
      return initialState;
    default:
      return state;
  }
};

export default productReducer;
