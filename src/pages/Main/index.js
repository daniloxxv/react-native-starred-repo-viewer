import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {asyncGetRequest} from '../../services/asyncRequests';
import asyncStorage from '../../services/asyncStorage';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  DeleteButton,
  DeleteButtonText,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main(props) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    asyncStorage(users, 'users', setUsers);
  }, [users]);

  const handleAddUser = () => {
    setLoading(true);
    asyncGetRequest(
      api,
      `/users/${newUser}`,
      ({name, login, bio, avatar_url}) =>
        setUsers([...users, {name, login, bio, avatar_url}]),
    );
    setNewUser('');
    setLoading(false);
    Keyboard.dismiss();
  };

  const handleDelete = index =>
    setUsers([...users.slice(0, index), ...users.slice(index + 1)]);

  const handleNavigate = user => {
    const {navigation} = props;
    navigation.navigate('User', {user});
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter a GitHub username"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({item, index}) => (
          <User>
            <Avatar source={{uri: item.avatar_url}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>View profile</ProfileButtonText>
            </ProfileButton>
            <DeleteButton onPress={() => handleDelete(index)}>
              <DeleteButtonText>Delete</DeleteButtonText>
            </DeleteButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Starred Repos Viewer',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
