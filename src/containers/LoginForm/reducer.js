import { login } from '../../routines/index';

const initialState = {
  isAuthorized: false,
  response: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case login.REQUEST:
      return {
        ...state,
        loading: true
      };
    case login.SUCCESS:
      return {
        ...state,
        response: action.payload,
        isAuthorized: true
      };
    case login.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case login.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
