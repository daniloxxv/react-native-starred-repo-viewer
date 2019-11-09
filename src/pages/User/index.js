import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({navigation}) {
  const [stars, setStars] = useState([]);
  const user = navigation.getParam('user');
  useEffect(() => {
    (async () => {
      const user = navigation.getParam('user');
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
    })();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar_url}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars
        data={stars}
        keyExtractor={({id}) => String(id)}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

User.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
