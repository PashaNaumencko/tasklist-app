import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import TaskList from '../TaskList';


const MainContainer = () => (
  <Container>
    <TaskList />
  </Container>
);

export default MainContainer;
