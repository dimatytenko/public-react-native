import { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';

import PostsList from '../../../components/PostsList';
import { globalStyle } from '../../../styles/global';
import LogOut from '../../../components/LogOut';
import Avatar from '../../../components/Avatar';

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([
    {
      comment: 'comment',
    },
  ]);
  const { height, width } = useWindowDimensions();

  const horizontal = width < 600;

  return (
    <ImageBackground style={styles.image} source={require('../../../assets/images/main-BG.png')}>
      <View
        style={{
          ...styles.body,
          position: 'relative',
          marginTop: horizontal ? 160 : 40,
        }}
      >
        <Avatar />
        <View style={styles.logOut}>
          <LogOut />
        </View>
        <View
          style={{
            ...styles.owner,
            marginTop: horizontal ? 90 : 30,
          }}
        >
          <Text style={{ ...globalStyle.mainTitle }}>{'qwerty'}</Text>
        </View>
        <View
          style={{
            maxHeight: horizontal ? '80%' : '77%',
          }}
        >
          <PostsList posts={userPosts} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  body: {
    backgroundColor: globalStyle.backgrounds.page,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexGrow: 1,
  },
  owner: {
    paddingHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  logOut: {
    position: 'absolute',
    right: 16,
    top: 22,
  },
});
