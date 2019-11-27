import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Segment, Button, Header, Form, Message } from 'semantic-ui-react';
import { createTaskRequest, editTaskRequest } from './actions';
import { setEditingTask } from '../TaskList/actions';

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      description: '',
      usernameError: null,
      emailError: null,
      descriptionError: null,
      authError: false
    };
  }

  componentDidUpdate(prevProps) {
    const { editingTask } = this.props;
    if (editingTask && !prevProps.editingTask) {
      this.setState({
        description: editingTask.text,
        usernameError: null,
        emailError: null,
        descriptionError: null
      });
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { editingTask } = nextProps;
  //   console.log(editingTask && !prevState.isSetDescription);
  //   if (editingTask && !prevState.isSetDescription) {
  //     console.log('here 1');
  //     return {
  //       ...prevState,
  //       description: editingTask.text,
  //       usernameError: null,
  //       emailError: null,
  //       descriptionError: null,
  //       isSetDescription: true
  //     };
  //   }
  //   console.log('here 2');
  //   return {
  //     ...prevState,
  //     description: prevState.description || '',
  //     descriptionError: null,
  //     isSetDescription: false
  //   };
  // }

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
    const { editingTask } = this.props;
    if (editingTask) {
      if (!this.validateDescription() && localStorage.getItem('token')) {
        const { description } = this.state;
        this.props.editTaskRequest({ id: editingTask.id, text: description, resetForm: this.resetForm });
      } else {
        this.setState({ authError: true });
      }
    } else if (this.validateForm()) {
      const { username, email, description } = this.state;
      this.props.createTaskRequest({ username, email, text: description, resetForm: this.resetForm });
    }
  };

  onEditCancel = () => {
    this.setState({ description: '', descriptionError: null, authError: false });
    this.props.setEditingTask(null);
  }

  resetForm = () => this.setState({ username: '', email: '', description: '' });

  render() {
    const {
      username,
      email,
      description,
      usernameError,
      emailError,
      descriptionError,
      authError } = this.state;
    const { loading, editingTask } = this.props;

    return (
      <Segment padded>
        <Header as="h3" content={editingTask ? 'Edit Task Description' : 'Create task'} textAlign="center" />
        <Form size="large" error={authError}>
          {editingTask ? null : (
            <Form.Group widths="equal">
              <Form.Input
                label="Username"
                placeholder="Username"
                error={usernameError}
                onBlur={this.validateUsername}
                onChange={this.onUsernameChange}
                disabled={loading}
                value={username}
              />
              <Form.Input
                label="Email"
                placeholder="Email"
                error={emailError}
                onBlur={this.validateEmail}
                onChange={this.onEmailChange}
                disabled={loading}
                value={email}
              />
            </Form.Group>
          )}
          <Form.TextArea
            rows={2}
            placeholder="Task description"
            label="Description"
            error={descriptionError}
            onBlur={this.validateDescription}
            onChange={this.onDescriptionChange}
            disabled={loading}
            value={description}
          />
          <Message
            error
            header="Auth Failed"
            content="You need to authenticate by admin."
          />
          {editingTask ? <Button secondary type="button" content="Cancel" onClick={this.onEditCancel} /> : null}
          <Button type="submit" content="Submit" onClick={this.onSubmit} loading={loading} />
        </Form>
      </Segment>
    );
  }
}

BaseForm.propTypes = {
  editingTask: PropTypes.object,
  loading: PropTypes.bool,
  createTaskRequest: PropTypes.func,
  editTaskRequest: PropTypes.func,
  setEditingTask: PropTypes.func
};

const mapStateToProps = ({ baseFormData: { loading, editingTask } }) => ({
  loading,
  editingTask
});

const mapDispatchToProps = {
  createTaskRequest,
  editTaskRequest,
  setEditingTask
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseForm);
