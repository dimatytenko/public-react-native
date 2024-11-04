import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { useRoute } from '../../Router';
import { authStateChangeUser } from '../../redux/auth/authOperations';

const Main = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  console.log('State', state);

  const routing = useRoute(state.isLoggedIn);

  useEffect(() => {
    authStateChangeUser()(dispatch);
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
