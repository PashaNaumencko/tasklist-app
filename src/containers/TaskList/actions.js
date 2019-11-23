import * as taskService from 'src/services/taskService';
import { FETCH_TASKS, FETCH_TASKS_LOADING } from '../../actionTypes/index';

const fetchtTasksAction = (tasks) => ({
  type: FETCH_TASKS,
  payload: tasks
});

const fetchtTasksLoadingAction = () => ({
  type: FETCH_TASKS_LOADING
});

export const fetchPosts = (filter) => async (dispatch) => {
  dispatch(fetchtTasksLoadingAction());
  const { message } = await taskService.getTasks(filter);
  dispatch(fetchtTasksAction(message));
};
