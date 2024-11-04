import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

import { globalStyle } from '../../../styles/global';
import CreatePostsScreen from '../CreatePostsScreen';
import PostsScreen from '../PostsScreen';
import ProfileScreen from '../ProfileScreen';

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <MainTab.Navigator>
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused, size, color }) => (
              <View style={[styles.buttonTab, focused && styles.buttonTabActive]}>
                <AntDesign
                  name="appstore-o"
                  size={26}
                  color={focused ? globalStyle.colors.fontButton : globalStyle.colors.fontPrimary}
                />
              </View>
            ),
          }}
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarShowLabel: false,
            title: 'Створити публікацію',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              ...globalStyle.headerTitle,
            },

            tabBarIcon: ({ focused, size, color }) => (
              <View style={[styles.buttonTab, focused && styles.buttonTabActive]}>
                <Feather
                  name="plus"
                  size={30}
                  color={focused ? globalStyle.colors.fontButton : globalStyle.colors.fontPrimary}
                />
              </View>
            ),
          }}
          name="CreatePosts"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,

            tabBarIcon: ({ focused, size, color }) => (
              <View style={[styles.buttonTab, focused && styles.buttonTabActive]}>
                <Ionicons
                  name="person-outline"
                  size={26}
                  color={focused ? globalStyle.colors.fontButton : globalStyle.colors.fontPrimary}
                />
              </View>
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparrent',
  },
  buttonTabActive: {
    backgroundColor: globalStyle.backgrounds.button,
  },
});
