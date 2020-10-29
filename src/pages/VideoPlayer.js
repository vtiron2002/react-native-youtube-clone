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
  TouchableOpacity,
  Button,
} from 'react-native';
import { useContextData } from '../context/context';
import YoutubePlayer from 'react-native-youtube-iframe';
import Constants from 'expo-constants';
import { rem } from '../utils';

import DATA from '../DATA.json';
import Card from './HomePage/Card';

import styled from 'styled-components';

const { width, height } = Dimensions.get('screen');

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  bottom: -100;
  left: 0;
  background: #202020;
  height: ${height - Constants.statusBarHeight};
  width: 100%;
  justify-content: flex-start;
`;

const StyledInfoCard = styled(ScrollView)`
  padding: ${rem(1)}px;
  flex: 1;
`;

const StyledTitle = styled(Text)`
  color: white;
  font-size: ${rem(1.1)};
  margin-bottom: ${rem(0.5)};
`;

const StyledPublishedAt = styled(Text)`
  color: gray;
  font-size: ${rem(0.7)};
  margin-bottom: ${rem(0.5)};
`;

const StyledDescription = styled(Text)`
  color: gray;
  border-bottom-width: 2;
  border-bottom-color: red;
`;

const StyledChannel = styled(View)`
  border-top-color: gray;
  border-top-width: 1px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  padding: ${rem(0.5)}px;
  margin: ${rem(1)}px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyleChannelName = styled(Text)`
  color: white;
  font-size: ${rem(1.3)};
`;

const VideoPlayer = () => {
  const { state, setState } = useContextData();
  const { currentVideo } = state;

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
    if (e.nativeEvent.contentOffset.y > 0) fadeIn();
    else if (e.nativeEvent.contentOffset.y < 0) {
      fadeOut();
      setState((s) => ({ ...s, currentVideo: null }));
    }
  };

  return (
    <AnimatedContainer style={{ bottom: fadeAnim }}>
      <ScrollView
        style={{
          width: '100%',
          maxHeight: 230,
        }}
        onScroll={(e) => handleScroll(e)}
      >
        <YoutubePlayer
          height={300}
          width='100%'
          videoId={currentVideo?.id.videoId}
          play={true}
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: 'us',
            showClosedCaptions: true,
          }}
        />
      </ScrollView>
      <StyledInfoCard>
        <StyledTitle>{currentVideo?.snippet.title}</StyledTitle>
        <StyledPublishedAt>
          {new Date(currentVideo?.snippet.publishedAt).toLocaleDateString()}
        </StyledPublishedAt>
        <StyledDescription>
          {currentVideo?.snippet.description}
        </StyledDescription>

        <StyledChannel>
          <StyleChannelName>
            {currentVideo?.snippet.channelTitle}
          </StyleChannelName>

          <Button title='SUBSCRIBE' color='red' />
        </StyledChannel>

        <View style={{ flex: 1 }}>
          <FlatList
            data={DATA.items}
            keyExtractor={(item) => item.id.videoId}
            renderItem={({ item }) => <Card searched video={item} />}
          />
        </View>
      </StyledInfoCard>
    </AnimatedContainer>
  );
};

export default VideoPlayer;
