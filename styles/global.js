import { StyleSheet } from 'react-native';

const colors = {
  fontPrimary: '#212121',
  fontSecondary: '#BDBDBD',
  fontMod: '#1B4371',
  fontButton: '#ffffff',
  borderInput: '#E8E8E8',
  borderInputActive: '#FF6C00',
};

const backgrounds = {
  page: '#ffffff',
  button: '#FF6C00',
  input: '#F6F6F6',
  comment: '#F6F6F6',
};

export const globalStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  screenContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  colors,
  backgrounds,
  mainTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    color: colors.fontPrimary,
  },
  mainText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    lineHeight: 25,
    color: colors.fontPrimary,
  },
  mainBoldText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 19,
    color: colors.fontPrimary,
  },
  placeholder: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: colors.fontSecondary,
  },
  header: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    lineHeight: 22,
    color: colors.fontPrimary,
  },
});
