import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

export default function RepoView({navigation}) {
  const repo = navigation.getParam('repo');
  return <WebView source={{uri: repo.html_url}} />;
}

RepoView.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('repo').full_name,
});

RepoView.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
