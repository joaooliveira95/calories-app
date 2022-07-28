import { Timestamp } from "firebase/firestore";

export interface IFood {
    id: string;
    uid: string;
    user_email: string;
    name: string;
    datetime: Timestamp;
    calorie_value: number;
}
