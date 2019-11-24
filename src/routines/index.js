import { createRoutine } from 'redux-routines';

export const fetchTasks = createRoutine('FETCH_TASKS');
export const createTask = createRoutine('CREATE_TASK');
export const SORT_TASKS = 'SORT_TASKS';
