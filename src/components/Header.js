import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { rem } from '../utils';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useContextData } from '../context/context';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const CustomIcon = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={s.customIcon}>
      {children}
    </TouchableOpacity>
  );
};

const SearchHeader = () => {
  const { backOutOfSearch, state, setState, handleSearch } = useContextData();

  return (
    <View style={sh.header}>
      <TouchableOpacity onPress={backOutOfSearch} style={sh.icon}>
        <Ionicons name='md-arrow-back' size={24} color='white' />
      </TouchableOpacity>
      <TextInput
        placeholder='Search'
        style={sh.input}
        autoFocus
        onSubmitEditing={handleSearch}
        placeholderTextColor='white'
        onChangeText={(text) => setState((s) => ({ ...s, searchTerm: text }))}
        value={state.searchTerm}
      />
      <TouchableOpacity style={sh.icon}>
        <Ionicons name='ios-mic' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const sh = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: rem(0.5),
  },
  input: {
    flex: 1,
    marginLeft: rem(1),
    fontSize: rem(1),
    color: 'white',
  },
  icon: {
    padding: rem(0.5),
  },
});

const Header = () => {
  const { state, setState } = useContextData();
  const { searching, videos } = state;

  const toggleSearch = () => {
    setState((s) => ({ ...s, searching: true }));
  };

  if (searching || videos.length) return <SearchHeader />;

  return (
    <View style={s.header}>
      <TouchableOpacity style={s.logo}>
        <Image
          style={s.logoIcon}
          source={require('../../assets/youtubeIcon.png')}
        />
        <Text style={s.logoText}>YouTube</Text>
      </TouchableOpacity>
      <View style={s.icons}>
        <CustomIcon>
          <FontAwesome name='bell-o' size={rem(1.5)} color='white' />
        </CustomIcon>
        <CustomIcon onPress={toggleSearch}>
          <Feather name='search' size={rem(1.5)} color='white' />
        </CustomIcon>
        <CustomIcon>
          <FontAwesome name='user-circle-o' size={rem(1.5)} color='white' />
        </CustomIcon>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: rem(0.5),
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: rem(1),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: rem(0.3),
  },
  logoIcon: {
    height: rem(1.9),
    width: rem(2),
    resizeMode: 'contain',
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customIcon: {
    marginLeft: rem(1),
  },
});

export default Header;
