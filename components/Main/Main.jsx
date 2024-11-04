import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from '../../Router';

const Main = () => {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
