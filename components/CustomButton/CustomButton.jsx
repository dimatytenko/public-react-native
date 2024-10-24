import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

import { globalStyle } from '../../styles/global';

const CustomButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.btnTitle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
    backgroundColor: globalStyle.backgrounds.button,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    color: globalStyle.colors.fontButton,
  },
});

export default CustomButton;
