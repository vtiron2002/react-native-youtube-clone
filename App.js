import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './src/components/Header';
import HomePage from './src/pages/HomePage/HomePage';
import Contants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rem } from './src/utils';
import ExplorePage from './src/pages/ExplorePage';
import SubscriptionsPage from './src/pages/SubscriptionsPage';
import LibraryPage from './src/pages/LibraryPage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContextProvider, { useContextData } from './src/context/context';
import SearchPage from './src/pages/SearchPage';
import VideoPlayer from './src/pages/VideoPlayer';

const Tab = createBottomTabNavigator();

function RootHome() {
  const { state, setState } = useContextData();
  const { searching, videos } = state;

  if (searching || videos.length) return <SearchPage />;

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-variant';
              break;
            case 'Explore':
              iconName = 'compass';
              break;
            case 'Subscriptions':
              iconName = 'youtube-subscription';
              break;
            case 'Library':
              iconName = 'library-video';
              break;
          }
          return (
            <TouchableOpacity style={{}}>
              <MaterialCommunityIcons
                name={iconName}
                size={rem(1.5)}
                color={color}
              />
            </TouchableOpacity>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        tabStyle: {
          backgroundColor: '#202020',
        },
      }}
    >
      <Tab.Screen name='Home' component={HomePage} />
      <Tab.Screen name='Explore' component={ExplorePage} />
      <Tab.Screen name='Subscriptions' component={SubscriptionsPage} />
      <Tab.Screen name='Library' component={LibraryPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={s.container}>
      <ContextProvider>
        <NavigationContainer>
          <StatusBar barStyle='light-content' />
          <Header />
          <RootHome />
          <VideoPlayer />
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#202020',
  },
});
