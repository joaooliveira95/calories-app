import { Button, Form, Modal } from "antd";
import Input from "antd/lib/input";
import React from "react";
import { useState } from "react";

export default function AddFriendWidget() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inviteUserData, setInviteUserData] = useState<{
    email: string;
    name: string;
  }>({ email: "", name: "" });

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    // invite friend

    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function renderForm() {
    return (
      <div className="cal-add-friend__form">
        <Input placeholder="Email" value={inviteUserData.email} />
        <Input placeholder="Name" value={inviteUserData.name} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Button type="primary" onClick={showModal}>
        Invite Friend
      </Button>
      <Modal
        title="Invite a Friend"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please provide a name.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
