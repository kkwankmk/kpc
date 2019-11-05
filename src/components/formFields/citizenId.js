import React from "react";
import { Form, Input } from "antd";

const FormItem = Form.Item;

const CitizenIdInput = ({ value = {}, onChange }) => {
  const triggerChange = changedData => {
    const newValue = { ...value, ...changedData };
    onChange(newValue);
  };

  return (
    <>
      <Input
        maxLength={1}
        style={{ width: "10%" }}
        onChange={e => triggerChange({ first: e.target.value })}
        value={value.first || undefined}
      />
      <span> - </span>
      <Input
        maxLength={4}
        style={{ width: "10%" }}
        onChange={e => triggerChange({ second: e.target.value })}
        value={value.second || undefined}
      />
      <span> - </span>

      <Input
        maxLength={5}
        style={{ width: "10%" }}
        onChange={e => triggerChange({ third: e.target.value })}
        value={value.third || undefined}
      />
      <span> - </span>

      <Input
        maxLength={2}
        style={{ width: "10%" }}
        onChange={e => triggerChange({ fourth: e.target.value })}
        value={value.fourth || undefined}
      />
      <span> - </span>

      <Input
        maxLength={1}
        style={{ width: "10%" }}
        onChange={e => triggerChange({ fifth: e.target.value })}
        value={value.fifth || undefined}
      />
    </>
  );
};

const CitizenIdField = ({ form, name, decorator = {}, formItemProps = {} }) => {
  const { getFieldDecorator } = form;

  return (
    <FormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(<CitizenIdInput />)}
    </FormItem>
  );
};

export default CitizenIdField;
