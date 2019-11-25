import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Container, Segment, Button, Icon, Header, Grid } from 'semantic-ui-react';
import MainContainer from '../MainContainer';
import LoginForm from '../LoginForm';


const history = createBrowserHistory();

const onLoginClick = () => history.push('/login');
const onLogoutClick = () => localStorage.setItem('token', '');
const onBackClick = () => history.push('/');

const Routing = ({ isAuthorized }) => (
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
                    content="Bach to App"
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
  </Container>
);

const mapStateToProps = ({ authData: { isAuthorized } }) => ({
  isAuthorized
});

export default connect(mapStateToProps)(Routing);
