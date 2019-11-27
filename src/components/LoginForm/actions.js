import * as services from '../../services';
import { login, LOG_OUT, SET_AUTH } from '../../routines/index';

export const logout = () => {
  localStorage.setItem('token', '');
  return { type: LOG_OUT };
};

export const setAuth = (token) => ({
  type: SET_AUTH,
  payload: { token }
});

export const loginRequest = ({ username, password, push, showError }) => async (dispatch) => {
  dispatch(login.request());
  const { status, message } = await services.login({ username, password });
  if (status === 'ok') {
    dispatch(login.success(message));
    localStorage.setItem('token', message.token);
    push('/');
  } else {
    dispatch(login.failure(message));
    showError();
  }
  dispatch(login.fulfill());
};
