import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

import PostsList from '../../../components/PostsList';
import { globalStyle } from '../../../styles/global';
import { db } from '../../../firebase/config';

const DefaultPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const { email, nickName } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    try {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsData = postsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.owner}>
        <Text style={globalStyle.mainBoldText}>{nickName}</Text>
        <Text style={globalStyle.placeholder}>{email}</Text>
      </View>
      <View style={styles.posts}>
        <PostsList posts={posts} setPosts={setPosts} />
      </View>
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.backgrounds.page,
  },
  owner: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  posts: {
    maxHeight: '92%',
  },
});
