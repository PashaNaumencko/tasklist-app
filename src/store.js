import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import taskListData from './components/TaskList/reducer';
import baseFormData from './components/BaseForm/reducer';
import authData from './components/LoginForm/reducer';

const initialState = {};

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  taskListData,
  baseFormData,
  authData
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
