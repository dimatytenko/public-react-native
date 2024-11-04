import { StyleSheet } from 'react-native';
import { globalStyle } from '../../styles/global';

export const styles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: globalStyle.backgrounds.page,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputs: {
    gap: 16,
    marginBottom: 43,
  },

  title: { textAlign: 'center', marginBottom: 33 },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  link: {
    marginTop: 16,
    alignSelf: 'center',
  },
  linkText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
  textMod: {
    textDecorationLine: 'underline',
  },
});
