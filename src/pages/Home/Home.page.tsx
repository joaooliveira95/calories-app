import "../../App.scss";
import FoodList from "../../components/FoodList/FoodList.component";
import { ReactElement } from "react";
import { useFoodEntries } from "../../context/food.context";

export default function HomePage(): ReactElement {
  const { userFoodEntries } = useFoodEntries();
  return (
    <>
      <FoodList foodEntries={userFoodEntries} />
    </>
  );
}
