import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Container, Segment, Button, Icon, Header, Grid } from 'semantic-ui-react';
import { NotificationContainer } from 'react-notifications';
import MainContainer from '../MainContainer';
import LoginForm from '../LoginForm';
import { setEditingTask } from '../TaskList/actions';
import { logout, setAuth } from '../LoginForm/actions';

import 'react-notifications/lib/notifications.css';

const history = createBrowserHistory();

const Routing = ({ isAuthorized, setEditingTask, logout, setAuth }) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setAuth(token);
    }
  }, [setAuth, token]);

  const onLoginClick = () => {
    setEditingTask(null);
    history.push('/login');
  };

  const onLogoutClick = () => logout();

  const onBackClick = () => history.push('/');

  return (
    <Container>
      <Router history={history}>
        <Segment>
          <Grid>
            <Grid.Column width="8" style={{ display: 'flex', alignItems: 'center' }}>
              <Header as="h3" content="Task App" />
            </Grid.Column>
            <Grid.Column width="8">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Button
                      color="green"
                      icon={<Icon name="sign-in" />}
                      floated="right"
                      content={isAuthorized ? 'Logout' : 'Login'}
                      onClick={isAuthorized ? onLogoutClick : onLoginClick}
                    />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <Button
                      color="green"
                      secondary
                      icon={<Icon name="arrow left" />}
                      position="left"
                      floated="right"
                      content="Back to App"
                      onClick={onBackClick}
                    />
                  )}
                />
              </Switch>
            </Grid.Column>
          </Grid>
        </Segment>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/login" component={LoginForm} />
        </Switch>
      </Router>
      <NotificationContainer />
    </Container>
  );
};

Routing.propTypes = {
  isAuthorized: PropTypes.bool,
  setEditingTask: PropTypes.func,
  logout: PropTypes.func,
  setAuth: PropTypes.func
};

const mapStateToProps = ({ authData: { isAuthorized } }) => ({
  isAuthorized
});

const mapDispatchToProps = {
  setEditingTask,
  logout,
  setAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
