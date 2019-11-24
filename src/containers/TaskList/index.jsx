import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Loader, Pagination, Checkbox } from 'semantic-ui-react';
import { fetchTasksRequest, sortTasks } from './actions';


class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      sortedColumn: null,
      sortingDirection: 'ascending'
    };
  }

  componentDidMount() {
    this.props.fetchTasksRequest({
      page: 1
    });
  }

  onSetComplete = (id) => () => {

  };

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
    this.setState({ activePage});
    this.props.fetchTasksRequest({ page: activePage });
  };

  // onEditClick = (user) => () => this.props.setModalVisibility(true, user);

  // onCancelClick = () => this.setState({ editingUserId: null });

  render() {
    const { activePage, sortedColumn, sortingDirection } = this.state;
    const { tasks, loading, totalTaskCount } = this.props;

    return loading ? (
      <div>
        <Loader active />
      </div>
    ) : (
      <Segment>
        <Table celled padded sortable singleLine size="large">
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
              <Table.Row key={task.id}>
                <Table.Cell textAlign="center">
                  <Checkbox
                    onChange={this.onSetComplete(task.id)}
                  />
                </Table.Cell>
                <Table.Cell>{task.username}</Table.Cell>
                <Table.Cell>{task.email}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    type="button"
                    icon={<Icon name="edit" />}
                    // onClick={this.onEditClick(task)}
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
                    firstItem={null}
                    lastItem={null}
                    totalPages={Math.round(totalTaskCount / 3)}
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

const mapStateToProps = ({ taskListData: { tasks, loading, totalTaskCount } }) => ({
  tasks,
  loading,
  totalTaskCount
});

const mapDispatchToProps = {
  fetchTasksRequest,
  sortTasks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
