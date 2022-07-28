import "./FoodList.component.scss";
import EditFoodWidget from "../EditFoodWidget/EditFoodWidget.component";
import Title from "antd/lib/typography/Title";
import { Button, DatePicker, List, Popconfirm } from "antd";
import { IFood } from "../../interfaces/food.interface";
import { ReactElement, useState } from "react";
import { filterFoodByPeriod, sortByDateTime } from "../../utils/utils";
import { toast } from "react-toastify";
import { useFoodEntries } from "../../context/food.context";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddFoodWidget from "../add-food-widget/AddFoodWidget.component";

const { RangePicker } = DatePicker;

interface IFoodList {
  allowUpdate?: boolean;
  foodEntries: IFood[];
  showEmail?: boolean;
}

export default function FoodList({
  showEmail = false,
  foodEntries,
  allowUpdate,
}: IFoodList): ReactElement {
  const { deleteFoodEntry } = useFoodEntries();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  const onRangePickerChange = (e: any) => {
    if (e && e[0] && e[1]) {
      setStartDate(e[0]);
      setEndDate(e[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const onDeleteFood = async (food: IFood) => {
    try {
      await deleteFoodEntry(food);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <div className="cal-food-list">
      <Title level={3}>Summary</Title>
      <List
        header={
          <div className="cal-food-list-header">
            <RangePicker showTime onChange={onRangePickerChange} />
            <AddFoodWidget />
          </div>
        }
        className="cal-food-list__container"
        itemLayout="horizontal"
        dataSource={sortByDateTime(
          filterFoodByPeriod(foodEntries, startDate, endDate)
        )}
        pagination={{ defaultCurrent: 1, pageSize: 4 }}
        renderItem={(item) => (
          <List.Item className="list-item">
            <List.Item.Meta
              title={item.name}
              description={`${item.calorie_value} kcal`}
            />
            <div className="list-item-content">
              <div>{item?.datetime?.toDate().toLocaleString()}</div>
              {showEmail && <div>{item.user_email}</div>}
              {allowUpdate && (
                <div className="list-item-content__actions">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setSelectedFood(item);
                      setIsEditModalVisible(true);
                    }}
                  ></Button>
                  <Popconfirm
                    title="Are you sure to delete this entry?"
                    onConfirm={() => onDeleteFood(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popconfirm>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
      {isEditModalVisible && selectedFood && (
        <EditFoodWidget
          food={selectedFood}
          isModalVisible={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
        />
      )}
    </div>
  );
}
