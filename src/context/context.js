import React, { createContext, useContext, useEffect, useState } from 'react';
// import { YOUTUBE_API_KEY } from 'react-native-dotenv';
import Constants from 'expo-constants';

const Context = createContext();

const ContextProvider = ({ children }) => {
  console.log();
  const [state, setState] = useState({
    videos: [],
    currentVideo: null,
    searchTerm: '',
    searching: false,
  });

  const backOutOfSearch = () =>
    setState({
      ...state,
      searching: false,
      videos: [],
      searchTerm: '',
      loading: false,
    });

  const handleSearch = () => {
    if (!state.searchTerm.trim()) return;
    const key = Constants.manifest.extra.youtubeApiKey;
    setState((s) => ({ ...s, loading: true }));
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${state.searchTerm}&type=video&key=${key}`,
    )
      .then((res) => res.json())
      .then((res) =>
        setState((s) => ({
          ...s,
          videos: res.items,
          searching: false,
          loading: false,
        })),
      )
      .catch((e) => console.log(e.message));
  };

  return (
    <Context.Provider
      value={{ state, setState, backOutOfSearch, handleSearch }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextData = () => useContext(Context);

export default ContextProvider;
