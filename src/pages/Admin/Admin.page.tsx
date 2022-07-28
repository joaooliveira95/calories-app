import FoodList from "../../components/FoodList/FoodList.component";
import { ReactElement } from "react";
import { canEdit, isAdmin } from "../../services/user.service";
import { useAuth } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import { useFoodEntries } from "../../context/food.context";
import { filterFoodByPeriod, getDateOfDaysAgo } from "../../utils/utils";

export default function AdminPage(): ReactElement {
  const { user } = useAuth();
  const { allFoodEntries } = useFoodEntries();

  if (!user && !isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  console.log(
    filterFoodByPeriod(allFoodEntries, getDateOfDaysAgo(7), new Date())
  );
  console.log(
    filterFoodByPeriod(
      allFoodEntries,
      getDateOfDaysAgo(14),
      getDateOfDaysAgo(7)
    )
  );

  return (
    <div className="admin-page">
      <FoodList
        allowUpdate={canEdit(user)}
        showEmail
        foodEntries={allFoodEntries}
      />
    </div>
  );
}
