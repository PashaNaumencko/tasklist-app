import callWebApi from 'src/helpers/webApiHelper';

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

export const editTask = async (request) => {
  const { id } = request;
  const response = await callWebApi({
    endpoint: `/edit/${id}`,
    type: 'PUT',
    request
  });
  return response.json();
};
