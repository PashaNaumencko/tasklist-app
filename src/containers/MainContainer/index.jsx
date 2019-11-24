import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import TaskList from '../TaskList';
import BaseForm from '../BaseForm';


const MainContainer = () => (
  <Container>
    <BaseForm />
    <TaskList />
  </Container>
);

export default MainContainer;
