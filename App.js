import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

// import LoginScreen from './screens/Auth/LoginScreen/LoginScreen';
import RegistrationScreen from './screens/Auth/RegistrationScreen/RegistrationScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return <RegistrationScreen />;
}
