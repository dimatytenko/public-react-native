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
  avatar: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: globalStyle.backgrounds.input,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  upload: {
    position: 'absolute',
    right: 0,
    bottom: 12.5,
    transform: [{ translateX: 12.5 }],
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: globalStyle.colors.borderInputActive,
    backgroundColor: 'transparent',
  },
  uploadActive: {
    backgroundColor: globalStyle.backgrounds.input,
    borderColor: globalStyle.colors.borderInput,
  },
  uploadIcon: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: globalStyle.colors.borderInputActive,
  },
  uploadIconActive: {
    transform: [{ rotate: '45deg' }],
    color: globalStyle.colors.borderInput,
  },
});
