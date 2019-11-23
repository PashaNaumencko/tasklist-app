import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import threadReducer from './containers/Thread/reducer';
import profileReducer from './containers/Profile/reducer';

const initialState = {};

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  posts: threadReducer,
  profile: profileReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
