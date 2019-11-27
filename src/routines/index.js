import { createRoutine } from 'redux-routines';

export const fetchTasks = createRoutine('FETCH_TASKS');
export const createTask = createRoutine('CREATE_TASK');
export const editTask = createRoutine('EDIT_TASK');
export const login = createRoutine('LOGIN');

export const SORT_TASKS = 'SORT_TASKS';
export const SET_EDITING_TASK = 'SET_EDITING_TASK';
export const LOG_OUT = 'LOG_OUT';
export const SET_AUTH = 'SET_AUTH';
