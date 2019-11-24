import * as taskService from '../../services/taskService';
import { createTask, fetchTasks } from '../../routines/index';

export const createTaskRequest = (request) => async (dispatch, getRootState) => {
  dispatch(createTask.request());
  const { status, message: createMessage } = await taskService.createTask(request);
  if (status === 'ok') {
    dispatch(createTask.success(createMessage));
    const { taskListData: { page } } = getRootState();
    const { message: fetchMessage } = await taskService.getTasks(page);
    dispatch(fetchTasks.success(fetchMessage));
  } else {
    dispatch(createTask.failure(createMessage));
  }
  dispatch(createTask.fulfill());
};
