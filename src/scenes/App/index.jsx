
import React from 'react';
import { Provider } from 'react-redux';
import MainContainer from 'src/containers/MainContainer';
import store from 'src/store';

const App = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

export default App;
