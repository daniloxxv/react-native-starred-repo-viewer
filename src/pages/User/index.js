import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {asyncGetRequest} from '../../services/asyncRequests';

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
  const [page, setPage] = useState(1);
  const user = navigation.getParam('user');
  useEffect(() => {
    asyncGetRequest(
      api,
      `/users/${user.login}/starred?per_page=5&page=${page}`,
      data => setStars(prevStars => [...prevStars, ...data]),
    );
  }, [navigation, page, user.login]);

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
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
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
