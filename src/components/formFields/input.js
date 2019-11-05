import React from "react";
import { Form, Input } from "antd";

const FormItem = Form.Item;

const InputField = ({
  form,
  name,
  decorator = {},
  controlProps = {},
  formItemProps = {}
}) => {
  const { getFieldDecorator } = form;

  return (
    <FormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(<Input {...controlProps} />)}
    </FormItem>
  );
};

export default InputField;
