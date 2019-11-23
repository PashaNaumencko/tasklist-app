import { FETCH_TASKS, FETCH_TASKS_LOADING } from '../../actionTypes/index';

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

export default (state = {}, action = initialState) => {
  switch (action.type) {
    case FETCH_TASKS_LOADING:
      return {
        ...state,
        tasks: action.posts
      };
    case LOAD_MORE_POSTS:
      return {
        ...state,
        posts: [...(state.posts || []), ...action.posts],
        hasMorePosts: Boolean(action.posts.length)
      };
    default:
      return state;
  }
};
