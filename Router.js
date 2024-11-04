import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Auth/LoginScreen';
import RegistrationScreen from './screens/Auth/RegistrationScreen';
import Home from './screens/Main/Home';

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          component={RegistrationScreen}
          name="Register"
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
          name="Login"
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        component={Home}
        name="Home"
      />
    </AuthStack.Navigator>
  );
};
