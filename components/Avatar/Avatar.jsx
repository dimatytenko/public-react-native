import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { globalStyle } from '../../styles/global';

const Avatar = () => {
  const [isAvatar, setIsAvatar] = useState(true);

  return (
    <View style={styles.avatar}>
      <Image
        style={styles.img}
        source={isAvatar ? require('../../assets/images/avatar.png') : ''}
      />
      <TouchableOpacity
        onPress={() => setIsAvatar((prevState) => !prevState)}
        style={[styles.upload, isAvatar && styles.uploadActive]}
      >
        <Text style={[styles.uploadIcon, isAvatar && styles.uploadIconActive]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

export const styles = StyleSheet.create({
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
