
import { addDoc, collection, getDocs, query, updateDoc, where, getDoc, doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase";
import { IFood } from "../interfaces/food.interface";

export async function addFood(food: IFood) {
    return await addDoc(collection(firestoreDB, "food"), food);
}

export async function updateFood(food: IFood) {
    const docRef = doc(firestoreDB, "food", food.id);
    return await updateDoc(docRef, food as any);
}
export async function deleteFood(food: IFood) {
    const docRef = doc(firestoreDB, "food", food.id);
    return await deleteDoc(docRef);
}

export async function getFoodEntries(uid: string) {
    console.log(uid)
    const q = query(collection(firestoreDB, "food"), where("uid", "==", uid));
    const docs = await getDocs(q);
    const foodEntries = docs.docs.map((item) => ({ ...item.data() as IFood, id: item.id }));
    return foodEntries
};

export async function getAllFoodEntries() {
    const q = query(collection(firestoreDB, "food"));
    const docs = await getDocs(q);
    const foodEntries = docs.docs.map((item) => ({ ...item.data() as IFood, id: item.id }));
    return foodEntries
};
