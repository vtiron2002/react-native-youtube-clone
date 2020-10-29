import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useContextData } from '../../context/context';
import { rem } from '../../utils';

import styled, { css } from 'styled-components';

const StyledCard = styled(TouchableOpacity)`
  border-bottom-color: #333;
  border-bottom-width: 1;
  margin-bottom: ${rem(1.5)};
  ${(props) =>
    props.searched &&
    css`
      padding: ${rem(0.5)}px;
    `}
`;

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: ${parseFloat(16 / 9)};
`;

const StyledCardInfo = styled(View)`
  padding: ${rem(0.5)}px;
  padding-bottom: ${rem(1)}px;
`;

const StyledTitle = styled(Text)`
  color: white;
  font-size: ${rem(1)}px;
`;

const StyledChannelName = styled(Text)`
  color: gray;
`;

const Card = ({ video, searched }) => {
  const thumbnail = video.snippet.thumbnails.high;
  const title = video.snippet.title;
  const channel = video.snippet.channelTitle;

  const { state, setState } = useContextData();

  return (
    <StyledCard
      searched={!!searched}
      onPress={() => setState((s) => ({ ...s, currentVideo: video }))}
    >
      <StyledImage source={{ url: thumbnail.url }} />
      <StyledCardInfo>
        <StyledTitle>{title}</StyledTitle>
        <StyledChannelName>{channel}</StyledChannelName>
      </StyledCardInfo>
    </StyledCard>
  );
};

export default Card;
