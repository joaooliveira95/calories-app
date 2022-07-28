export type UserRole = "admin" | "user"

export interface IUser {
    uid: string;
    email: string;
    role: string;
}