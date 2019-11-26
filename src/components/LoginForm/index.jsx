import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Segment, Button, Header, Form, Message } from 'semantic-ui-react';
import { loginRequest } from './actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
      loginError: false
    };
  }

  validateUsername = () => {
    const { username } = this.state;
    const usernameError = validator.isEmpty(username) ? 'Required' : null;
    this.setState({ usernameError });
    return usernameError;
  };

  validatePassword = () => {
    const { password } = this.state;
    const passwordError = validator.isEmpty(password) ? 'Required' : null;
    this.setState({ passwordError });
    return passwordError;
  };

  onUsernameChange = (event, { value: username }) => this.setState({ username, usernameError: null });

  onPasswordChange = (event, { value: password }) => this.setState({ password, passwordError: null });

  onLoginError = () => this.setState({ loginError: true });

  validateForm = () => [!this.validateUsername(), !this.validatePassword()].every(Boolean);

  onSubmit = () => {
    if (this.validateForm()) {
      const { username, password } = this.state;
      const { history: { push } } = this.props;
      this.props.loginRequest({ username, password, push, showError: this.onLoginError });
    }
  }

  render() {
    const { usernameError, passwordError, loginError } = this.state;
    const { loading } = this.props;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Segment
          padded
          style={{ minWidth: 450 }}
          centered
        >
          <Header as="h3" content="Login" textAlign="center" />
          <Form size="big" error={loginError}>
            <Form.Input
              label="Username"
              placeholder="Username"
              error={usernameError}
              onBlur={this.validateUsername}
              onChange={this.onUsernameChange}
              disabled={loading}
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              error={passwordError}
              onBlur={this.validatePassword}
              onChange={this.onPasswordChange}
              disabled={loading}
            />
            <Message
              error
              header="Login Failed"
              content="Incorrent username or password."
            />
            <Button type="submit" content="Login" onClick={this.onSubmit} loading={loading} />
          </Form>
        </Segment>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  loginRequest: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = ({ authData: { loading } }) => ({
  loading
});

const mapDispatchToProps = {
  loginRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
