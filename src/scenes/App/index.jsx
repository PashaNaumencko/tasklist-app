
import React from 'react';
import { Provider } from 'react-redux';
import Routing from 'src/containers/Routing';
import store from 'src/store';

const App = () => (
  <Provider store={store}>
    <Routing />
  </Provider>
);

export default App;
