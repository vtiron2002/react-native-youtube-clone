import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { rem } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useContextData } from '../context/context';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

const StyledHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${rem(0.5)}px;
`;

const StyledIcon = styled(TouchableOpacity)`
  padding: ${rem(1)}px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  margin-left: ${rem(1)};
  font-size: ${rem(1)};
  color: white;
`;

const SearchHeader = () => {
  const { backOutOfSearch, state, setState, handleSearch } = useContextData();

  return (
    <StyledHeader>
      <StyledIcon onPress={backOutOfSearch}>
        <Ionicons name='md-arrow-back' size={24} color='white' />
      </StyledIcon>
      <StyledTextInput
        placeholder='Search'
        autoFocus
        onSubmitEditing={handleSearch}
        placeholderTextColor='white'
        onChangeText={(text) => setState((s) => ({ ...s, searchTerm: text }))}
        value={state.searchTerm}
      />
      <StyledIcon>
        <Ionicons name='ios-mic' size={24} color='white' />
      </StyledIcon>
    </StyledHeader>
  );
};

const StyledYoutubeLogo = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const StyledYoutubeLogoImage = styled(Image)`
  height: ${rem(1.9)};
  width: ${rem(2)};
  resize-mode: contain;
`;

const StyledYoutubeLogoText = styled(Text)`
  font-size: ${rem(1)};
  font-weight: bold;
  color: white;
  margin-left: ${rem(0.3)};
`;

const StyledIcons = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const CustomIcon = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: rem(1),
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

const Header = () => {
  const { state, setState } = useContextData();
  const { searching, videos } = state;

  const toggleSearch = () => {
    setState((s) => ({ ...s, searching: true }));
  };

  if (searching || videos.length) return <SearchHeader />;

  return (
    <StyledHeader>
      <StyledYoutubeLogo>
        <StyledYoutubeLogoImage
          source={require('../../assets/youtubeIcon.png')}
        />
        <StyledYoutubeLogoText>YouTube</StyledYoutubeLogoText>
      </StyledYoutubeLogo>
      <StyledIcons>
        <CustomIcon>
          <FontAwesome name='bell-o' size={rem(1.5)} color='white' />
        </CustomIcon>
        <CustomIcon onPress={toggleSearch}>
          <Feather name='search' size={rem(1.5)} color='white' />
        </CustomIcon>
        <CustomIcon>
          <FontAwesome name='user-circle-o' size={rem(1.5)} color='white' />
        </CustomIcon>
      </StyledIcons>
    </StyledHeader>
  );
};

export default Header;
