import {showMessage} from 'react-native-flash-message';

export default ({message}) => {
  showMessage({
    message,
    type: 'danger',
    duration: 2000,
  });
};
