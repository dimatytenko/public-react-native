import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { globalStyle } from '../../styles/global';

const LogOut = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        console.log('LogOut');
      }}
    >
      <Ionicons name="log-out-outline" size={44} color={globalStyle.colors.fontSecondary} />
    </TouchableOpacity>
  );
};

export default LogOut;
