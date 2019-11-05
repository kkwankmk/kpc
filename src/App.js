import React, { Component } from "react";
import { connect } from "react-redux";

import UserForm from "./components/userForm";
import UserTable from "./components/userTable";
import { createUser, updateUser, deleteUsers } from "./components/duck/user";

import "./App.css";

class App extends Component {
  state = {
    editId: null
  };

  updateEditId = (editId = null) => {
    this.setState({ editId });
  };

  handleSubmit = formData => {
    const { editId } = this.state;
    if (editId) {
      return (
        this.props.updateUser({
          data: { ...formData, id: editId }
        }),
        this.updateEditId()
      );
    }

    return this.props.createUser({
      data: { ...formData, id: new Date().valueOf() }
    });
  };

  getInitialValue = () => {
    const { users } = this.props;
    const { editId } = this.state;

    if (!editId) return {};

    return users.find(user => user.id === editId);
  };

  render() {
    const { users, deleteUsers } = this.props;

    return (
      <div className="app">
        <UserForm onSubmit={this.handleSubmit} user={this.getInitialValue()} />
        {users.length > 0 && (
          <UserTable
            users={users}
            updateEditId={this.updateEditId}
            deleteUsers={deleteUsers}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

export default connect(
  mapStateToProps,
  { createUser, updateUser, deleteUsers }
)(App);
