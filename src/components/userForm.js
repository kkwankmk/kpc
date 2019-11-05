import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button } from "antd";
import moment from "moment";

import InputField from "./formFields/input";
import CitizenIdField from "./formFields/citizenId";
import SelectField from "./formFields/select";
import DatePickerField from "./formFields/datePicker";
import RadioField from "./formFields/radio";
import {
  NameTitleOptions,
  GenderOptions,
  PhoneCodeOptions,
  NationalityOptions
} from "./constants";

const Wrapper = styled.div`
  padding: 25px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-bottom: 25px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  margin-right: 16px;
`;

const required = name => {
  return { required: true, message: `Please input your ${name}!` };
};

class UserForm extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, data) => {
      if (err) {
        return;
      }

      this.props.onSubmit(data);
      this.props.form.resetFields();
    });
  };

  validateCitizenId = (rule, citizenId, callback) => {
    if (citizenId) {
      const values = Object.values(citizenId);

      let count = 0;
      values.forEach(value => {
        count += parseInt(value).toString().length;
      });

      if (count !== 13) {
        return callback("Invalid Citizen ID");
      }
    }

    callback();
  };

  render() {
    const { form, user = {} } = this.props;

    return (
      <Wrapper>
        <Form layout="inline">
          <div>
            <SelectField
              form={form}
              name="title"
              options={NameTitleOptions}
              formItemProps={{ label: "Title" }}
              decorator={{
                initialValue: user.title || "mr",
                rules: [required()]
              }}
            />
            <InputField
              name="name"
              form={form}
              formItemProps={{ label: "First Name" }}
              decorator={{
                initialValue: user.name,
                rules: [required("First Name")]
              }}
            />
            <InputField
              name="lastName"
              form={form}
              formItemProps={{ label: "Last Name" }}
              decorator={{
                initialValue: user.lastName,
                rules: [required("Last Name")]
              }}
            />
          </div>
          <div>
            <DatePickerField
              form={form}
              name="birthday"
              formItemProps={{ label: "Birthday" }}
              controlProps={{ allowClear: false }}
              decorator={{
                initialValue: user.birthday ? moment(user.birthday) : null,
                rules: [required("Birthday")]
              }}
            />
            <SelectField
              form={form}
              name="nationality"
              options={NationalityOptions}
              formItemProps={{ label: "Nationality" }}
              decorator={{
                initialValue: user.nationality
              }}
              controlProps={{
                placeholder: "---Please Select---",
                style: { width: "240px" }
              }}
            />
          </div>
          <FlexRow>
            <CitizenIdField
              name="citizenID"
              form={form}
              formItemProps={{ label: "CitizenID" }}
              decorator={{
                initialValue: user.citizenID,
                rules: [
                  {
                    validator: this.validateCitizenId
                  }
                ]
              }}
            />
          </FlexRow>
          <FlexRow>
            <RadioField
              name="gender"
              form={form}
              formItemProps={{ label: "Gender" }}
              options={GenderOptions}
              decorator={{
                initialValue: user.gender || "Male"
              }}
            />
          </FlexRow>
          <FlexRow>
            <SelectField
              form={form}
              name="phoneCode"
              options={PhoneCodeOptions}
              formItemProps={{ label: "Mobile Phone" }}
              decorator={{
                initialValue: user.phoneCode || "+66",
                rules: [required("Mobile Phone")]
              }}
            />
            <StyledSpan> - </StyledSpan>
            <InputField
              name="phone"
              form={form}
              decorator={{
                initialValue: user.phone,
                rules: [
                  required("Mobile Phone"),
                  {
                    pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,9}$/,
                    message: "Field must be valid phone number."
                  }
                ]
              }}
            />
          </FlexRow>
          <FlexRow>
            <InputField
              name="passport"
              form={form}
              formItemProps={{ label: "Passport No" }}
              decorator={{
                initialValue: user.passport
              }}
            />
          </FlexRow>
          <FlexRow>
            <InputField
              name="salary"
              form={form}
              formItemProps={{ label: "Expected Salary" }}
              controlProps={{
                type: "number"
              }}
              decorator={{
                initialValue: user.salary,
                rules: [required("Expected Salary")]
              }}
            />
            <span>THB</span>
          </FlexRow>
        </Form>
        <Button type="primary" onClick={this.handleSubmit}>
          SUBMIT
        </Button>
      </Wrapper>
    );
  }
}

export default Form.create()(UserForm);
