import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import taskListData from './containers/TaskList/reducer';
import baseFormData from './containers/BaseForm/reducer';

const initialState = {};

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  taskListData,
  baseFormData
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
