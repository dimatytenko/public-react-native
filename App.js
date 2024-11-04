import 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native';
import { useFonts } from 'expo-font';
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './redux/store';

import Main from './components/Main';

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

  return (
    <Provider store={store.store}>
      {/* <PersistGate loading={<Text>Loading...</Text>} persistor={store.persistor}> */}
      <Main />
      {/* </PersistGate> */}
    </Provider>
  );
}
