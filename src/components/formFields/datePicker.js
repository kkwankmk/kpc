import React from "react";
import moment from "moment";
import { Form, DatePicker } from "antd";
import styled from "styled-components";

const FormItem = Form.Item;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

function disabledDate(current) {
  return current && current > moment().endOf("day");
}

const DatePickerField = ({
  form,
  name,
  decorator = {},
  controlProps = {},
  formItemProps = {},
  format = "MM/DD/YYYY"
}) => {
  const { getFieldDecorator } = form;

  return (
    <FormItem {...formItemProps}>
      {getFieldDecorator(name, decorator)(
        <StyledDatePicker
          {...controlProps}
          format={format}
          disabledDate={disabledDate}
        />
      )}
    </FormItem>
  );
};

export default DatePickerField;
