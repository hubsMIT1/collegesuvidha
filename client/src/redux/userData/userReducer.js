
const initialState = {
    userData: null,
  };
 
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        return {
          ...state,
          userData: action.payload.userData,
        };
      case 'CLEAR_USER_DATA':
        return initialState;
      default:
        return state;
    }
  };
  
  export default userReducer;
  