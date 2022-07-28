import { Button, Form, FormInstance, Input } from "antd";
import Modal from "antd/lib/modal";
import { ReactElement } from "react";

interface IAuthModal {
  form: FormInstance<any>;
  formId: string;
  handleCancel: () => void;
  handleOk: () => void;
  isModalVisible: boolean;
  onFinish: (values: any) => Promise<void>;
  onFinishFailed: (errorInfo: any) => void;
  title: string;
}

export default function AuthModal({
  form,
  formId,
  handleCancel,
  handleOk,
  isModalVisible,
  onFinish,
  onFinishFailed,
  title,
}: IAuthModal): ReactElement {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button form={formId} key="submit" htmlType="submit">
          Ok
        </Button>,
      ]}
    >
      <Form
        form={form}
        id={formId}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        preserve={false}
        style={{ maxWidth: 425 }}
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please provide a valid email.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: "Please provide a password.",
            },
          ]}
        >
          <Input type={"password"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
