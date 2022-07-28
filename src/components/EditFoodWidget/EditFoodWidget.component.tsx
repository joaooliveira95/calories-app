import { Modal } from "antd";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import React from "react";
import { ReactElement } from "react";
import { toast } from "react-toastify";
import { useFoodEntries } from "../../context/food.context";
import { IFood } from "../../interfaces/food.interface";

interface IEditFoodWidget {
  food: IFood;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditFoodWidget({
  food,
  isModalVisible,
  setIsModalVisible,
}: IEditFoodWidget): ReactElement {
  const [form] = Form.useForm();
  const { editFoodEntry } = useFoodEntries();

  const onFinish = async (values: IFood) => {
    try {
      await editFoodEntry({ ...food, ...values });
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <Modal
        destroyOnClose={true}
        title="Edit Food"
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          preserve={false}
          style={{ maxWidth: 425 }}
        >
          <Form.Item
            label="Food/Product Name"
            name="name"
            initialValue={food.name}
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
            <InputNumber min={0} defaultValue={food.calorie_value} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
