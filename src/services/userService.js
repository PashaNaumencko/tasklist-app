import callWebApi from 'src/helpers/webApiHelper';

export const login = async (request) => {
  const response = await callWebApi({
    endpoint: '/login',
    type: 'POST',
    request,
  });
  return response.json();
};
