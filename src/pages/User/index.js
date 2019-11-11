import React, {useEffect, useState} from 'react';
import {TouchableNativeFeedback, ActivityIndicator} from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const user = navigation.getParam('user');
  const refreshList = () => {
    setStars([]);
    setPage(1);
  };
  const handleNavigate = repo => {
    navigation.navigate('RepoView', {repo});
  };

  useEffect(() => {
    // If there are no more starred repos to show, return before the AJAX call
    setLoading(true);
    asyncGetRequest(api, `/users/${user.login}/starred?page=${page}`, data => {
      setStars(prevStars => {
        if (data.length === 0) {
          setDone(true);
          return prevStars;
        }
        return [...prevStars, ...data];
      });
      setLoading(false);
    });
  }, [page, user.login]);

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
        onEndReached={() => !done && setPage(page + 1)}
        onRefresh={refreshList}
        refreshing={loading && stars.length === 0}
        onEndReachedThreshold={0}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <TouchableNativeFeedback onPress={() => handleNavigate(item)}>
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </TouchableNativeFeedback>
          </Starred>
        )}
      />
      {loading && <ActivityIndicator color="#ddd" />}
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
