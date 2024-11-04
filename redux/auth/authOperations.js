import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { authSlice } from './authReducer';
import { auth } from '../../firebase/config';

const { updateUserProfile, authStateChange, authSignOut, authLoginError } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch) => {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = credentials.user;

      if (user) {
        await updateProfile(user, {
          displayName: nickName,
        });
      }

      const newUser = auth.currentUser;

      if (newUser) {
        dispatch(
          updateUserProfile({
            nickName: nickName,
            userId: user.uid,
            email: user.email,
          }),
        );
        dispatch(
          authStateChange({
            isLoggedIn: true,
          }),
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;

      if (user) {
        dispatch(
          updateUserProfile({
            nickName: user.displayName,
            userId: user.uid,
            email: user.email,
          }),
        );
        dispatch(
          authStateChange({
            isLoggedIn: true,
          }),
        );
      }
    } catch (error) {
      console.log('error', error);
      dispatch(authLoginError({ errorLogin: true }));
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const authStateChangeUser = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          nickName: user.displayName,
          userId: user.uid,
          email: user.email,
        }),
      );
      dispatch(
        authStateChange({
          isLoggedIn: true,
        }),
      );
    }
  });
};
