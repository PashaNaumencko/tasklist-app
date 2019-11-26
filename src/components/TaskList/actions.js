import * as services from '../../services';
import { fetchTasks, SORT_TASKS, SET_EDITING_TASK } from '../../routines/index';

export const sortTasks = (column, direction = 'ascending') => ({
  type: SORT_TASKS,
  payload: {
    column,
    direction
  }
});

export const setEditingTask = (task) => ({
  type: SET_EDITING_TASK,
  payload: task
});

export const fetchTasksRequest = ({ page, sortedColumn, sortingDirection }) => async (dispatch) => {
  dispatch(fetchTasks.request());
  const { status, message } = await services.getTasks({ page });
  if (status === 'ok') {
    dispatch(fetchTasks.success({ ...message, page }));
    if (sortedColumn && sortingDirection) {
      dispatch(sortTasks(sortedColumn, sortingDirection));
    }
  } else {
    dispatch(fetchTasks.failure(message));
  }
  dispatch(fetchTasks.fulfill());
};
