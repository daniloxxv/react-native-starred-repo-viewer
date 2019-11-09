import showErrorMessage from './showErrorMessage';
export const asyncGetRequest = async (api, endpoint, callback) => {
  try {
    const response = await api.get(endpoint);
    callback(response.data);
  } catch (err) {
    showErrorMessage(err);
  }
};
