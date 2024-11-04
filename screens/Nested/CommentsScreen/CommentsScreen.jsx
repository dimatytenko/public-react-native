import { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { doc, collection, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { globalStyle } from '../../../styles/global';
import ImagePost from '../../../components/ImagePost';
import toDateTime from '../../../helpers/toDateTime';
import { db } from '../../../firebase/config';

const CommentsScreen = () => {
  const route = useRoute();
  const flatListRef = useRef(null);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);
  const { postId, photo } = route.params;

  const { height, width } = useWindowDimensions();

  const vertical = width < 600;

  const createPost = async () => {
    if (!comment) {
      return;
    }

    try {
      const newComment = {
        comment,
        nickName,
        date: new Date(),
      };

      const commentsCollection = collection(db, 'posts', postId, 'comments');
      await addDoc(commentsCollection, newComment);

      await updateDoc(doc(db, 'posts', postId), {
        countComments: allComments.length + 1,
      });

      Keyboard.dismiss();
      setComment('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const getAllComments = async (id) => {
    try {
      const commentsCollection = collection(db, 'posts', id, 'comments');
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsData = commentsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllComments(commentsData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    getAllComments(postId);
  }, []);

  return (
    <View style={styles.container}>
      {vertical && (
        <View style={styles.boxImage}>
          <ImagePost photo={photo} />
        </View>
      )}
      <SafeAreaView style={styles.commentsContainer}>
        <FlatList
          ref={flatListRef}
          onLayout={() =>
            flatListRef.current?.scrollToEnd({
              animated: true,
            })
          }
          data={allComments}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.comment,
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              }}
            >
              <Text
                style={{
                  ...styles.commentNick,
                  marginRight: index % 2 === 0 ? 16 : 0,
                  marginLeft: index % 2 !== 0 ? 16 : 0,
                }}
              >
                {item.nickName}
              </Text>
              <View
                style={{
                  ...styles.commentBox,
                  borderTopLeftRadius: index % 2 === 0 ? 0 : 6,
                  borderTopRightRadius: index % 2 !== 0 ? 0 : 6,
                }}
              >
                <Text
                  style={{
                    ...styles.commentText,
                    ...globalStyle.mainText,
                  }}
                >
                  {item.comment}
                </Text>
                <Text
                  style={{
                    ...globalStyle.placeholder,
                    textAlign: index % 2 === 0 ? 'right' : 'left',
                  }}
                >
                  {toDateTime(item.date.seconds)}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.date}
        />
      </SafeAreaView>
      <View style={styles.boxInput}>
        <TextInput
          style={{
            ...styles.input,
            ...globalStyle.mainText,
          }}
          onChangeText={setComment}
          value={comment}
          placeholder="Коментувати..."
          placeholderTextColor={globalStyle.colors.fontSecondary}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={createPost} style={styles.arrowUpButton}>
          <AntDesign name="arrowup" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: 'space-between',
    backgroundColor: globalStyle.backgrounds.page,
  },
  boxImage: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  commentsContainer: {
    flex: 1,
    marginTop: 32,
    marginBottom: 32,
  },
  comment: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  commentNick: {},
  commentBox: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 16,
    borderRadius: 6,
    backgroundColor: globalStyle.backgrounds.comment,
  },
  commentText: {
    marginBottom: 8,
  },
  boxInput: {
    position: 'relative',
    paddingHorizontal: 16,
  },
  input: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 68,
    backgroundColor: globalStyle.backgrounds.input,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: globalStyle.colors.borderInput,
  },
  arrowUpButton: {
    position: 'absolute',
    top: 5,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: globalStyle.backgrounds.button,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
