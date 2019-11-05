import React from "react";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const SelectField = ({
  form,
  name,
  decorator = {},
  controlProps = {},
  formItemProps = {},
  options = []
}) => {
  const { getFieldDecorator } = form;

  const renderOptions = options.map((option, index) => {
    return (
      <Option key={index} value={option.value}>
        {option.title}
      </Option>
    );
  });

  return (
    <FormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(
        <Select {...controlProps}>{renderOptions}</Select>
      )}
    </FormItem>
  );
};

export default SelectField;
