import React, { createContext, useContext, useEffect, useState } from 'react';
require('dotenv').config();

const Context = createContext();

const ContextProvider = ({ children }) => {
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
    const key = process.env.YOUTUBE_API_KEY;
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
