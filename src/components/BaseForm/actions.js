import xss from 'xss';
import { NotificationManager } from 'react-notifications';
import * as services from '../../services';
import { setEditingTask } from '../TaskList/actions';
import { createTask, fetchTasks, editTask } from '../../routines/index';

export const createTaskRequest = ({ username, email, text, resetForm }) => async (dispatch, getRootState) => {
  dispatch(createTask.request());
  const { status, message: createMessage } = await services.createTask({ username, email, text: xss(text) });
  if (status === 'ok') {
    dispatch(createTask.success(createMessage));
    NotificationManager.success('Task has successfully created');
    const { taskListData: { page } } = getRootState();
    const { message: fetchMessage } = await services.getTasks(page);

    dispatch(fetchTasks.success(fetchMessage));
  } else {
    dispatch(createTask.failure(createMessage));
  }
  resetForm();
  dispatch(createTask.fulfill());
};

export const editTaskRequest = ({ id, text, resetForm }) => async (dispatch, getRootState) => {
  dispatch(editTask.request());
  const { authData: { response: { token } } } = getRootState();
  const { status, message } = await services.editTask(id, { text: xss(text), token });
  if (status === 'ok') {
    dispatch(editTask.success(message));
    NotificationManager.success('Task description edited');
    dispatch(setEditingTask(null));
  } else {
    dispatch(editTask.failure(message));
  }
  resetForm();
  dispatch(editTask.fulfill());
};
