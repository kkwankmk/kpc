import React, { Component } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";

const FormItem = Form.Item;

const StyledFormItem = styled(FormItem)`
  .ant-form-item-control-wrapper {
    width: 80%;

    @media (max-width: 575px) {
      width: 100%;
    }
  }
`;

class CitizenIdInput extends Component {
  render() {
    const { value = {}, onChange } = this.props;

    const triggerChange = (e, filed) => {
      const changedData = e.target.value;
      const newValue = { ...value, [filed]: changedData };
      onChange(newValue);

      if (changedData.length === e.target.maxLength) {
        const next = parseInt(e.target.id) + 1;
        next < 6 && this.refs[next].focus();
      }
    };

    return (
      <>
        <Input
          ref={1}
          id="1"
          maxLength={1}
          style={{ width: "15%" }}
          onChange={e => triggerChange(e, "first")}
          value={value.first || undefined}
        />
        <span> - </span>
        <Input
          ref={2}
          id="2"
          maxLength={4}
          style={{ width: "15%" }}
          onChange={e => triggerChange(e, "second")}
          value={value.second || undefined}
        />
        <span> - </span>

        <Input
          ref={3}
          id="3"
          maxLength={5}
          style={{ width: "15%" }}
          onChange={e => triggerChange(e, "third")}
          value={value.third || undefined}
        />
        <span> - </span>

        <Input
          ref={4}
          id="4"
          maxLength={2}
          style={{ width: "15%" }}
          onChange={e => triggerChange(e, "fourth")}
          value={value.fourth || undefined}
        />
        <span> - </span>

        <Input
          ref={5}
          id="5"
          maxLength={1}
          style={{ width: "15%" }}
          onChange={e => triggerChange(e, "fifth")}
          value={value.fifth || undefined}
        />
      </>
    );
  }
}

const CitizenIdField = ({ form, name, decorator = {}, formItemProps = {} }) => {
  const { getFieldDecorator } = form;
  return (
    <StyledFormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(<CitizenIdInput />)}
    </StyledFormItem>
  );
};

export default CitizenIdField;
