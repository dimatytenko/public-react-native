import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  nickName: null,
  email: null,
  isLoggedIn: false,
  errorLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload: { userId, nickName, email } }) => ({
      ...state,
      userId: userId,
      nickName: nickName,
      email: email,
    }),
    authStateChange: (state, { payload: { isLoggedIn } }) => ({
      ...state,
      isLoggedIn: isLoggedIn,
    }),
    authSignOut: () => initialState,
    authLoginError: (state, { payload: { errorLogin } }) => ({
      ...state,
      errorLogin: errorLogin,
    }),
  },
});
