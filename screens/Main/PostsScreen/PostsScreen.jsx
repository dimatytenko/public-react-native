import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { globalStyle } from '../../../styles/global';
import DefaultPostsScreen from '../../Nested/DefaultPostsScreen';
import CommentsScreen from '../../Nested/CommentsScreen';
import MapScreen from '../../Nested/MapScreen';
import LogOut from '../../../components/LogOut';

export const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        component={DefaultPostsScreen}
        options={{
          title: 'Публікації',
          headerTitleAlign: 'center',
          headerRight: () => <LogOut />,
          headerTitleStyle: {
            ...globalStyle.headerTitle,
          },
        }}
        name="DefaultScreen"
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...globalStyle.headerTitle,
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Карта',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...globalStyle.headerTitle,
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
