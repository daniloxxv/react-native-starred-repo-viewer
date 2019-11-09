import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

export default function User({navigation}) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    (async () => {
      const user = navigation.getParam('user');
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
    })();
  }, [navigation]);

  return <Text>{JSON.stringify(stars)}</Text>;
}

User.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,,
  }).isRequired,
};
