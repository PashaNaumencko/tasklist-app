import * as userService from '../../services/userService';
import { login } from '../../routines/index';

export const loginRequest = ({ username, password, push, showError }) => async (dispatch) => {
  dispatch(login.request());
  const { status, message } = await userService.login({ username, password });
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
