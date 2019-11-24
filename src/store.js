import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import taskListData from './containers/TaskList/reducer';

const initialState = {};

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  taskListData
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
