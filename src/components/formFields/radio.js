import React from "react";
import { Form, Radio } from "antd";

const FormItem = Form.Item;
const { Group } = Radio;

const RadioField = ({
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
      <Radio key={index} value={option.value}>
        {option.title}
      </Radio>
    );
  });

  return (
    <FormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(
        <Group {...controlProps}>{renderOptions}</Group>
      )}
    </FormItem>
  );
};

export default RadioField;
