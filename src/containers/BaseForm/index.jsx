import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Segment, Button, Header, Form } from 'semantic-ui-react';
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
      this.props.createTaskRequest({ username, email, text: description, resetForm: this.resetForm });
    }
  }

  resetForm = () => this.setState({ username: '', email: '', description: '' });

  render() {
    const { usernameError, emailError, descriptionError } = this.state;
    const { loading } = this.props;

    return (
      <Segment padded>
        <Header as="h3" content="Create Task" textAlign="center" />
        <Form size="large">
          <Form.Group widths="equal">
            <Form.Input
              label="Username"
              placeholder="Username"
              error={usernameError}
              onBlur={this.validateUsername}
              onChange={this.onUsernameChange}
              disabled={loading}
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              error={emailError}
              onBlur={this.validateEmail}
              onChange={this.onEmailChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.TextArea
            rows={2}
            placeholder="Task description"
            label="Description"
            error={descriptionError}
            onBlur={this.validateDescription}
            onChange={this.onDescriptionChange}
            disabled={loading}
          />
          <Button type="submit" content="Submit" onClick={this.onSubmit} loading={loading} />
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = ({ baseFormData: { loading, editingDescription } }) => ({
  loading,
  editingDescription
});

const mapDispatchToProps = {
  createTaskRequest
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseForm);
