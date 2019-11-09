import React from 'react';
import {View, Text} from 'react-native';

export default function User({navigation}) {
  return <Text>{JSON.stringify(navigation.getParam('user'))}</Text>;
}
