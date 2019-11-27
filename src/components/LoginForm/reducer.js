import { login, LOG_OUT, SET_AUTH } from '../../routines/index';

const initialState = {
  isAuthorized: false,
  response: {},
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
    case SET_AUTH:
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
    case LOG_OUT:
      return {
        ...state,
        isAuthorized: false,
        response: {}
      };
    default:
      return state;
  }
};
