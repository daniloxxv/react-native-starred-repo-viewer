import React, {useState} from 'react';
import {Text, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {Container, Form, Input, SubmitButton} from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleAddUser = async () => {
    const response = await api.get(`/users/${newUser}`);
    const {name, login, bio, avatar_url} = response.data;
    setUsers([...users, {name, login, bio, avatar_url}]);
    setNewUser('');
    Keyboard.dismiss();
  };
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton onPress={handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
      {users.map(user => (
        <Text>{user.login}</Text>
      ))}
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Hola',
};
