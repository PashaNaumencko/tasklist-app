import sortBy from 'lodash.sortby';
import { fetchTasks, SORT_TASKS } from '../../routines/index';

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case fetchTasks.REQUEST:
      return {
        ...state,
        loading: true
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalTaskCount: action.payload.total_task_count,
        page: action.payload.page,
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchTasks.FULFILL:
      return {
        ...state,
        loading: false
      };
    case SORT_TASKS:
      if (action.payload.direction === 'ascending') {
        return {
          ...state,
          tasks: sortBy(state.tasks, [action.payload.column])
        };
      }
      return {
        ...state,
        tasks: [...state.tasks].reverse()
      };
    default:
      return state;
  }
};
