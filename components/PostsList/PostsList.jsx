import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { globalStyle } from '../../styles/global';
import ImagePost from '../../components/ImagePost';

const PostsList = ({ posts }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <ImagePost photo={item?.photo} />

          <Text style={{ ...globalStyle.mainBoldText }}>{item?.comment}</Text>
          <View style={styles.bottomPost}>
            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => {
                navigation.navigate('Comments', {
                  postId: item?.id,
                  photo: item?.photo,
                });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconBottomPost}>
                {(item?.countComments && (
                  <FontAwesome
                    name="commenting"
                    size={24}
                    color={globalStyle.colors.borderInputActive}
                  />
                )) || (
                  <FontAwesome
                    name="commenting-o"
                    size={24}
                    color={globalStyle.colors.fontSecondary}
                  />
                )}
              </View>

              <Text
                style={{
                  ...globalStyle.mainText,
                }}
              >
                {item?.countComments}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => changeLike(item?.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconBottomPost}>
                {(item?.countLike?.some((el) => el === userId) && (
                  <AntDesign name="like1" size={24} color={globalStyle.colors.borderInputActive} />
                )) || <AntDesign name="like2" size={24} color={globalStyle.colors.fontSecondary} />}
              </View>

              <Text
                style={{
                  ...globalStyle.mainText,
                }}
              >
                {item?.countLike?.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => {
                navigation.navigate('Map', {
                  location: item?.location,
                });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconBottomPost}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={globalStyle.colors.fontSecondary}
                />
              </View>
              <Text
                style={{
                  ...globalStyle.mainText,
                  ...styles.location,
                }}
              >
                {item?.place}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default PostsList;

const styles = StyleSheet.create({
  post: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  place: {
    marginBottom: 8,
  },
  bottomPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBottomPost: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconBottomPost: {
    marginRight: 6,
  },
  location: { textDecorationLine: 'underline' },
});
