import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import React from "react";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import { useFoodEntries } from "../../context/food.context";

export default function AddFoodWidget(): ReactElement {
  const { user } = useAuth();
  const { addFoodEntry } = useFoodEntries();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      addFoodEntry({
        uid: user?.uid,
        user_email: user?.email,
        datetime: new Date(),
        ...values,
      });
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Food
      </Button>
      <Modal
        destroyOnClose={true}
        title="New Food"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          preserve={false}
          style={{ maxWidth: 425 }}
        >
          <Form.Item
            label="Food/Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the food/product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Calorie Value"
            name="calorie_value"
            rules={[
              { required: true, message: "Please input the calorie value!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
