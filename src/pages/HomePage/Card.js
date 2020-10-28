import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContextData } from '../../context/context';
import { rem } from '../../utils';

const Card = ({ video, searched }) => {
  const thumbnail = video.snippet.thumbnails.high;
  const title = video.snippet.title;
  const channel = video.snippet.channelTitle;
  const description = video.snippet.description;

  const { state, setState } = useContextData();

  return (
    <TouchableOpacity
      onPress={() => {
        if (state.currentVideo === video.id.videoId)
          return setState((s) => ({ ...s, currentVideo: null }));
        setState((s) => ({ ...s, currentVideo: video }));
      }}
      style={searched ? { ...s.card, padding: rem(0.6) } : s.card}
    >
      <Image
        source={{ url: thumbnail.url }}
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
        }}
      />
      <View style={s.info}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.channel}>{channel}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const s = StyleSheet.create({
  card: {
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: rem(0.5),
  },
  info: {
    padding: rem(0.5),
    paddingBottom: rem(1),
  },
  title: {
    color: 'white',
    fontSize: rem(1),
  },
  channel: {
    color: 'grey',
  },
});
