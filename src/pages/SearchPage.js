import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useContextData } from '../context/context';
import Card from './HomePage/Card';

const SearchPage = () => {
  const { state, handleSearch } = useContextData();
  const { videos, loading } = state;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={loading || false}
        onRefresh={() => handleSearch()}
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => <Card searched video={item} />}
      />
    </View>
  );
};

export default SearchPage;
