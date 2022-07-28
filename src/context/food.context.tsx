import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IFood } from "../interfaces/food.interface";
import {
  addFood,
  deleteFood,
  getAllFoodEntries,
  getFoodEntries,
  updateFood,
} from "../services/food.service";
import { isAdmin } from "../services/user.service";
import { useAuth } from "./auth.context";

const FoodContext = createContext<{
  addFoodEntry: (foodEntry: IFood) => Promise<void>;
  deleteFoodEntry: (foodEntry: IFood) => Promise<void>;
  editFoodEntry: (foodEntry: IFood) => Promise<void>;
  userFoodEntries: IFood[];
  allFoodEntries: IFood[];
}>({
  allFoodEntries: [],
  addFoodEntry: async (foodEntry: IFood) => {},
  deleteFoodEntry: async (foodEntry: IFood) => {},
  editFoodEntry: async (foodEntry: IFood) => {},
  userFoodEntries: [],
});
interface IFoodContextProviderProps {
  children: ReactNode;
}

export const FoodProvider = ({ children }: IFoodContextProviderProps) => {
  const [userFoodEntries, setUserFoodEntries] = useState<IFood[]>([]);
  const [allFoodEntries, setAllFoodEntries] = useState<IFood[]>([]);
  const { user } = useAuth();

  const getFoodEntriesHandler = async () => {
    setUserFoodEntries([]);
    const foodEntries = await getFoodEntries(user?.uid);
    if (foodEntries.length === 0) toast.warning(`No food entries found`);
    setUserFoodEntries([...foodEntries]);
  };

  const getAllFoodEntriesHandler = async () => {
    const foodEntries = await getAllFoodEntries();
    setAllFoodEntries(foodEntries);
  };

  const addFoodEntry = async (food: IFood) => {
    await addFood(food);
    await getFoodEntriesHandler();
    if (isAdmin(user)) {
      getAllFoodEntriesHandler();
    }
  };

  const editFoodEntry = async (food: IFood) => {
    await updateFood(food);
    await getFoodEntriesHandler();
    if (isAdmin(user)) {
      getAllFoodEntriesHandler();
    }
  };

  const deleteFoodEntry = async (food: IFood): Promise<void> => {
    await deleteFood(food);
    await getFoodEntriesHandler();
    if (isAdmin(user)) {
      getAllFoodEntriesHandler();
    }
  };

  useEffect(() => {
    getFoodEntriesHandler();
    if (isAdmin(user)) {
      getAllFoodEntriesHandler();
    }
  }, [user?.uid]);

  return (
    <FoodContext.Provider
      value={{
        allFoodEntries,
        userFoodEntries,
        addFoodEntry,
        editFoodEntry,
        deleteFoodEntry,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodEntries = () => useContext(FoodContext);
