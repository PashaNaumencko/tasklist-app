import callWebApi from 'src/helpers/webApiHelper';

export const login = async (request) => {
  const response = await callWebApi({
    endpoint: '/login',
    type: 'POST',
    request,
  });
  return response.json();
};

export const getTasks = async (filter) => {
  const response = await callWebApi({
    endpoint: '/',
    type: 'GET',
    query: filter
  });
  return response.json();
};

export const createTask = async (request) => {
  const response = await callWebApi({
    endpoint: '/create',
    type: 'POST',
    request
  });
  return response.json();
};

export const editTask = async (id, request) => {
  const response = await callWebApi({
    endpoint: `/edit/${id}`,
    type: 'POST',
    request
  });
  return response.json();
};
