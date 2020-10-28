import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import { useContextData } from '../context/context';
import YoutubePlayer from 'react-native-youtube-iframe';
import Constants from 'expo-constants';
import { rem } from '../utils';

import DATA from '../DATA.json';
import Card from './HomePage/Card';

const { width, height } = Dimensions.get('screen');

const VideoPlayer = () => {
  const { state, setState } = useContextData();
  const { currentVideo } = state;
  const [playing, setPlaying] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -height - Constants.statusBarHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (state.currentVideo) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [state.currentVideo]);

  const handleScroll = (e) => {
    console.log(e.nativeEvent.contentOffset.y);
    if (e.nativeEvent.contentOffset.y > 0) fadeIn();
    else if (e.nativeEvent.contentOffset.y < 0) {
      fadeOut();
      setState((s) => ({ ...s, currentVideo: null }));
    }
  };

  return (
    <Animated.View style={[s.container, { bottom: fadeAnim }]}>
      <ScrollView
        style={{
          width: '100%',
        }}
        onScroll={(e) => handleScroll(e)}
      >
        <YoutubePlayer
          height={300}
          width='100%'
          videoId={currentVideo?.id.videoId}
          play={true}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: 'us',
            showClosedCaptions: true,
          }}
        />
      </ScrollView>
      <ScrollView style={s.info}>
        <Text style={s.title}>{currentVideo?.snippet.title}</Text>
        <Text style={s.publishedAt}>
          {new Date(currentVideo?.snippet.publishedAt).toLocaleDateString()}
        </Text>
        <Text style={s.description}>{currentVideo?.snippet.description}</Text>

        <View style={s.channel}>
          <Text style={s.channelName}>
            {currentVideo?.snippet.channelTitle}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={DATA.items}
            keyExtractor={(item) => item.id.videoId}
            renderItem={({ item }) => <Card searched video={item} />}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -100,
    left: 0,
    backgroundColor: 'white',
    height: height - Constants.statusBarHeight,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#202020',
  },
  info: {
    padding: rem(1),
  },
  title: {
    color: 'white',
    fontSize: rem(1.1),
    marginBottom: rem(0.5),
  },
  publishedAt: {
    color: 'gray',
    fontSize: rem(0.7),
    marginBottom: rem(0.5),
  },
  description: {
    color: 'gray',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  channel: {
    borderTopColor: 'gray',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: rem(1),
    marginVertical: rem(1),
  },
  channelName: {
    color: 'white',
    fontSize: rem(1.3),
  },
});

export default VideoPlayer;
