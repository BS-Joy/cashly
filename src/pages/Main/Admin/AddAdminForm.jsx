import { Form, Input, Select } from "antd";
import React from "react";

export default function AddAdminForm({ setIsModalOpen }) {
  const [form] = Form.useForm();

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  const onFinish = (value) => {
    const userData = { ...value };

    userData.phone = value.mobile;

    console.log(userData);
  };
  return (
    <Form
      form={form}
      name="normal_login"
      layout="vertical"
      initialValues={{}}
      onFinish={onFinish}
      requiredMark={false}
      className="text-start w-full mt-6"
    >
      {/* <Form.Item
        name="user Id"
        rules={[
          {
            required: true,
            message: "Please input id!",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="User Id *"
          className="rounded-md bg-white border border-red-400 pl-6"
        />
      </Form.Item> */}

      {/* names */}
      <div className="flex gap-3 justify-between">
        {/* first name */}
        <Form.Item
          className="w-full"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input first name!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="First Name *"
            className="rounded-md bg-white border border-red-400 pl-6"
          />
        </Form.Item>

        {/* last name */}
        <Form.Item
          className="w-full"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input last name!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Last Name *"
            className="rounded-md bg-white border border-red-400 pl-6 w-full"
          />
        </Form.Item>
      </div>

      {/* email mobile & role */}
      <div className="flex items-center gap-3">
        {/* email */}
        <Form.Item
          className="w-full"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please input an email!",
            },
            {
              required: true,
              message: "Please input first name!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Email *"
            className="rounded-md bg-white border border-red-400 pl-6"
            // visibilitytoggle={value.toString()}
          />
        </Form.Item>

        {/* mobile */}
        <Form.Item
          className="w-full"
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please input phone number!",
            },
            {
              pattern: /^\d+$/, // Example:  Allow only digits
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <Input
            size="large"
            type="tel"
            placeholder="Mobile *"
            className="rounded-md bg-white border border-red-400 pl-6"
            // visibilitytoggle={value.toString()}
          />
        </Form.Item>

        {/* role */}
        <Form.Item
          className="w-full"
          name="role"
          rules={[
            {
              required: true,
              message: "Please select a role!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a role *"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "1", label: "Accountant" },
              { value: "2", label: "Moderator" },
              { value: "3", label: "Admin" },
              { value: "4", label: "Staff" },
            ]}
            className="min-h-[55px]"
          />
        </Form.Item>
      </div>

      {/* username, pass & confirm password */}
      <div className="flex items-center gap-3">
        {/* username */}
        {/* <Form.Item
          className="w-full"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input first name!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Username *"
            className="rounded-md bg-white border border-red-400 pl-6"
            // visibilitytoggle={value.toString()}
          />
        </Form.Item> */}

        {/* password */}
        <Form.Item
          className="w-full"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password *"
            className="rounded-md bg-white border border-red-400 pl-6"
            // visibilitytoggle={value.toString()}
          />
        </Form.Item>

        {/* confirm password */}
        <Form.Item
          className="w-full"
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
            validateConfirmPassword({ getFieldValue: form.getFieldValue }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm password *"
            className="rounded-md bg-white border border-red-400 pl-6"
          />
        </Form.Item>
      </div>

      <div className="w-full flex gap-5 justify-center ">
        <button
          type="submit"
          className="border bg-red-700 text-white px-8 py-2 rounded-md border-red-700"
        >
          Add User
        </button>
        <button
          type="button"
          className="border border-red-700 text-red-700 px-10 rounded"
          onClick={() => setIsModalOpen(false)}
        >
          cancel
        </button>
      </div>
    </Form>
  );
}
