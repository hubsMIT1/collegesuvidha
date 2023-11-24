const initialState = {
  isAuthenticated: localStorage.getItem("userId")?true:false,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  userId: localStorage.getItem("userId") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const newState = {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
      };
      return newState;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
