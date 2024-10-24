import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { globalStyle } from '../../styles/global';

const Input = ({ value, onChange, placeholder, maxLength, withSecurity, onFocus }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecurity, setIsSecurity] = useState(true);
  return (
    <View style={styles.view}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder={placeholder}
        maxLength={maxLength}
        placeholderTextColor={globalStyle.colors.fontSecondary}
        onFocus={() => {
          setIsFocused((prevState) => !prevState);
          onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={withSecurity && isSecurity}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
      />
      {withSecurity && (
        <TouchableOpacity
          style={styles.iconPasswordBox}
          onPress={() => {
            setIsSecurity((prevState) => !prevState);
          }}
        >
          <Text style={styles.iconPassword}>{isSecurity ? 'Показати' : 'Сховати'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

export const styles = StyleSheet.create({
  view: { position: 'relative' },
  input: {
    borderWidth: 1,
    borderColor: globalStyle.colors.borderInput,
    height: 50,
    borderRadius: 8,
    backgroundColor: globalStyle.backgrounds.input,
    padding: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: globalStyle.colors.fontPrimary,
  },
  inputFocused: {
    borderColor: globalStyle.colors.borderInputActive,
    backgroundColor: 'transparent',
  },
  iconPasswordBox: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
  iconPassword: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
});
