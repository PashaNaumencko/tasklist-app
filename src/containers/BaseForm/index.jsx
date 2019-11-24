import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Form } from 'semantic-ui-react';
import { createTaskRequest } from './actions';

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      description: '',
      usernameError: null,
      emailError: null,
      descriptionError: null
    };
  }

  validateUsername = () => {
    const { username } = this.state;
    const usernameError = validator.isEmpty(username) ? 'Required' : null;
    this.setState({ usernameError });
    return usernameError;
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailError = null;
    if (validator.isEmpty(email)) {
      emailError = 'Required';
    } else if (!validator.isEmail(email)) {
      emailError = 'Incorrect email format';
    }
    this.setState({ emailError });
    return emailError;
  };


  validateDescription = () => {
    const { description } = this.state;
    const descriptionError = validator.isEmpty(description) ? 'Required' : null;
    this.setState({ descriptionError });
    return descriptionError;
  };

  onUsernameChange = (event, { value: username }) => this.setState({ username, usernameError: null });

  onEmailChange = (event, { value: email }) => this.setState({ email, emailError: null });

  onDescriptionChange = (event, { value: description }) => this.setState({ description, descriptionError: null });

  validateForm = () => [!this.validateUsername(), !this.validateEmail(), !this.validateDescription()].every(Boolean);

  onSubmit = () => {
    if (this.validateForm()) {
      const { username, email, description } = this.state;
      console.log({ username, email, description }, 'submit');
      this.props.createTaskRequest({ username, email, text: description });
    }
  }

  render() {
    const { usernameError, emailError, descriptionError } = this.state;

    return (
      <Segment padded>
        <Header as="h3" content="Create Task" textAlign="center" size="large" />
        <Form size="huge">
          <Form.Group widths="equal">
            <Form.Input
              label="Username"
              placeholder="Username"
              error={usernameError}
              onBlur={this.validateUsername}
              onChange={this.onUsernameChange}
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              error={emailError}
              onBlur={this.validateEmail}
              onChange={this.onEmailChange}
            />
          </Form.Group>
          <Form.TextArea
            rows={2}
            placeholder="Task description"
            label="Description"
            error={descriptionError}
            onBlur={this.validateDescription}
            onChange={this.onDescriptionChange}
          />
          <Button type="submit" content="Submit" size="huge" onClick={this.onSubmit} />
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = ({ baseFormData: { loading } }) => ({
  loading
});

const mapDispatchToProps = {
  createTaskRequest
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseForm);
