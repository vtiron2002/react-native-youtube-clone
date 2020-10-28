import React from 'react';
import { FlatList, View } from 'react-native';
import WebView from 'react-native-webview';
import PageTemplate from '../../components/PageTemplate';
import Card from './Card';

import DATA from '../../DATA.json';

const HomePage = () => {
  const videos = DATA.items;

  return (
    <PageTemplate>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => <Card video={item} />}
      />
    </PageTemplate>
  );
};

export default HomePage;
