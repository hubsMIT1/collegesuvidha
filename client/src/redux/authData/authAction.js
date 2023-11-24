export const loginSuccess = (accessToken,refreshToken, userId) => ({
    type: 'LOGIN_SUCCESS',
    payload: { accessToken, refreshToken, userId },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  