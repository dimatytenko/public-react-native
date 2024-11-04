import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';

import PostsList from '../../../components/PostsList';
import { globalStyle } from '../../../styles/global';
import LogOut from '../../../components/LogOut';
import Avatar from '../../../components/Avatar';
import { db } from '../../../firebase/config';

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { height, width } = useWindowDimensions();
  const { userId, nickName } = useSelector((state) => state.auth);

  const horizontal = width < 600;

  const getUserPosts = async () => {
    try {
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, where('userId', '==', userId));
      const postsSnapshot = await getDocs(q);

      const postsData = postsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUserPosts(postsData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

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
          <Text style={{ ...globalStyle.mainTitle }}>{nickName}</Text>
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
