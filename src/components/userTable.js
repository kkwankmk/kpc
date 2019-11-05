import React, { Component } from "react";
import styled from "styled-components";
import { Table, Button, Popconfirm, Checkbox } from "antd";

const ButtonStyled = styled(Button)`
  margin-right: 5px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledSelectBox = styled.div`
  position: absolute;
  top: 16px;
  z-index: 2;
`;

const itemPaginationRender = (current, type, originalElement) => {
  if (type === "prev") {
    return <a>PREV</a>;
  }
  if (type === "next") {
    return <a>NEXT</a>;
  }
  return originalElement;
};

class UserTable extends Component {
  state = {
    isSelectAll: false,
    selectedRowKeys: []
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onSelectAll = e => {
    const { users } = this.props;
    let selectedRowKeys = [];
    if (e.target.checked) {
      selectedRowKeys = users.map(user => user.id);
    }

    this.setState({
      selectedRowKeys,
      isSelectAll: e.target.checked
    });
  };

  deleteButton = id => (
    <Popconfirm
      title="Sure to delete?"
      onConfirm={() => this.props.deleteUsers(id)}
    >
      <Button type="danger">Delete</Button>
    </Popconfirm>
  );

  render() {
    const { updateEditId, users } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      columnTitle: " ",
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (name, record) => `${name} ${record.lastName}`
      },
      {
        title: "Gender",
        dataIndex: "gender"
      },
      {
        title: "Mobile phone",
        dataIndex: "phone",
        render: (phone, record) => `${record.phoneCode}${phone}`
      },
      {
        title: "Nationality",
        dataIndex: "nationality",
        render: nationality => nationality || "-"
      },
      {
        title: "",
        dataIndex: "id",
        render: id => (
          <>
            <ButtonStyled type="primary" onClick={() => updateEditId(id)}>
              Edit
            </ButtonStyled>
            {this.deleteButton([id])}
          </>
        )
      }
    ];

    return (
      <Wrapper>
        <StyledSelectBox>
          <Checkbox onChange={this.onSelectAll}>Select all</Checkbox>{" "}
          {this.deleteButton(selectedRowKeys)}
        </StyledSelectBox>
        <Table
          rowSelection={rowSelection}
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ position: "top", itemRender: itemPaginationRender }}
          scroll={{ x: true }}
        />
      </Wrapper>
    );
  }
}

export default UserTable;
