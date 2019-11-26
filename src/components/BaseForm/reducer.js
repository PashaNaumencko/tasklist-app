import { createTask, editTask, SET_EDITING_TASK } from '../../routines/index';

const initialState = {
  editingTask: null,
  response: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case createTask.REQUEST:
    case editTask.REQUEST:
      return {
        ...state,
        loading: true
      };
    case createTask.SUCCESS:
    case editTask.SUCCESS:
      return {
        ...state,
        response: action.payload
      };
    case createTask.FAILURE:
    case editTask.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case createTask.FULFILL:
    case editTask.FULFILL:
      return {
        ...state,
        loading: false
      };
    case SET_EDITING_TASK:
      return {
        ...state,
        editingTask: action.payload
      };
    default:
      return state;
  }
};
