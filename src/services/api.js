import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com',
});

export const asyncGetRequest = async (
  api,
  endpoint,
  callback,
  errorHandler,
) => {
  try {
    const response = await api.get(endpoint);
    callback(response.data);
  } catch (err) {
    errorHandler(err);
  }
};
