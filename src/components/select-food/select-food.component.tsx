
import { Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { ReactElement } from 'react'

import { useFoodEntries } from '../../context/food.context'
import { sortByDateTime } from '../../utils/utils'

const { Option } = Select;

export default function SelectFoodList(): ReactElement {
    const { userFoodEntries } = useFoodEntries();
    const { addFoodEntry } = useFoodEntries();

    return (<div className="cal-food-list">
            <Select defaultValue="Select a Food" style={{ width: 250 }}>

            {sortByDateTime(userFoodEntries).map((item) => (
                    <>
                            <Option value={item.id} label={item.name}>
                                <div className="list-item-content">
                                    <div>{item.name}</div>
                                    <div className="description">{`${item.calorie_value} kcal`}</div>
                                </div>
                            </Option>
                    </>
                ))}
                                        </Select>

                </div>
)}
