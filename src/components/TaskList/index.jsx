import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Loader, Pagination, Checkbox } from 'semantic-ui-react';
import { fetchTasksRequest, sortTasks, setEditingTask } from './actions';
import * as services from '../../services';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      sortedColumn: null,
      sortingDirection: 'ascending',
      completedTaskIds: []
    };
  }

  componentDidMount() {
    this.props.fetchTasksRequest({
      page: 1
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tasks } = nextProps;
    if (tasks && tasks.some(({ status }) => status === 10) && !prevState.completedTaskIds.length) {
      const completedTaskIds = tasks.filter(({ status }) => status === 10).map(({ id }) => id);
      return {
        ...prevState,
        completedTaskIds
      };
    }
    return null;
  }

  onEditTask = (task) => () => this.props.setEditingTask(task);

  onSetComplete = (id) => () => {
    const { token } = this.props;
    if (this.isComplete(id)) {
      this.setState((prevState) => ({
          completedTaskIds: prevState.completedTaskIds.filter((taskId) => taskId !== id)
      }));
      services.editTask(id, { token, status: 0 });
    } else {
      this.setState((prevState) => ({
        completedTaskIds: [...prevState.completedTaskIds, id]
      }));
      services.editTask(id, { token, status: 10 });
    }
  };

  isComplete = (id) => this.state.completedTaskIds.some((taskId) => taskId === id);

  onColumnSort = (clickedColumn) => () => {
    const { sortedColumn, sortingDirection } = this.state;
    const { sortTasks } = this.props;

    if (sortedColumn !== clickedColumn) {
      this.setState({ sortedColumn: clickedColumn, sortingDirection: 'ascending' });
      sortTasks(clickedColumn);
      return;
    }

    this.setState({ sortingDirection: sortingDirection === 'ascending' ? 'descending' : 'ascending' });
    sortTasks(clickedColumn, 'descending');
  };

  onPaginationChange = (event, { activePage }) => {
    const { sortedColumn, sortingDirection } = this.state;
    const { fetchTasksRequest } = this.props;
    this.setState({ activePage });
    fetchTasksRequest({
      page: activePage,
      sortedColumn,
      sortingDirection
    });
  };


  render() {
    const { activePage, sortedColumn, sortingDirection } = this.state;
    const { tasks, loading, totalTaskCount, isAuthorized } = this.props;

    return loading ? (
      <Segment>
        <Loader active />
      </Segment>
    ) : (
      <Segment>
        <Table celled padded compact sortable size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell
                sorted={sortedColumn === 'username' ? sortingDirection : null}
                onClick={this.onColumnSort('username')}
              >
                Username
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'email' ? sortingDirection : null}
                onClick={this.onColumnSort('email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell>
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'status' ? sortingDirection : null}
                onClick={this.onColumnSort('status')}
              >
                Status
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasks.map((task) => (
              <Table.Row key={task.id} positive={this.isComplete(task.id)}>
                <Table.Cell textAlign="center">
                  <Checkbox
                    disabled={!isAuthorized}
                    checked={this.isComplete(task.id)}
                    onChange={this.onSetComplete(task.id)}
                  />
                </Table.Cell>
                <Table.Cell>{task.username}</Table.Cell>
                <Table.Cell>{task.email}</Table.Cell>
                <Table.Cell>{task.text}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    type="button"
                    icon={<Icon name="edit" />}
                    onClick={this.onEditTask(task)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                {tasks.length ? (
                  <Pagination
                    boundaryRange={0}
                    activePage={activePage}
                    totalPages={Math.ceil(totalTaskCount / 3)}
                    onPageChange={this.onPaginationChange}
                  />
                ) : (
                  <Header as="h3" textAlign="center" content="No available tasks" />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  totalTaskCount: PropTypes.string,
  token: PropTypes.string,
  fetchTasksRequest: PropTypes.func,
  sortTasks: PropTypes.func,
  setEditingTask: PropTypes.func
};


const mapStateToProps = ({
  taskListData: { tasks, loading, totalTaskCount },
  authData: { isAuthorized, response: { token } } }) => ({
  tasks,
  loading,
  totalTaskCount,
  isAuthorized,
  token
});

const mapDispatchToProps = {
  fetchTasksRequest,
  sortTasks,
  setEditingTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
