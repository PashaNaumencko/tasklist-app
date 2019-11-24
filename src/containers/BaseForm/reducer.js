import { createTask } from '../../routines/index';

const initialState = {
  editingDescription: '',
  response: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case createTask.REQUEST:
      return {
        ...state,
        loading: true
      };
    case createTask.SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case createTask.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case createTask.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
