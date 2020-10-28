import React from 'react';
import { View } from 'react-native';

export default (props) => (
  <View style={{ backgroundColor: '#202020', flex: 1 }}>{props.children}</View>
);
