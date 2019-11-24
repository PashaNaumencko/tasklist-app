import * as taskService from '../../services/taskService';
import { fetchTasks, SORT_TASKS } from '../../routines/index';

export const sortTasks = (column, direction = 'ascending') => ({
  type: SORT_TASKS,
  payload: {
    column,
    direction
  }
});

export const fetchTasksRequest = (filter) => async (dispatch) => {
  dispatch(fetchTasks.request());
  const { status, message } = await taskService.getTasks(filter);
  if (status === 'ok') {
    dispatch(fetchTasks.success(message));
  } else {
    dispatch(fetchTasks.failure(message));
  }
  dispatch(fetchTasks.fulfill());
};
