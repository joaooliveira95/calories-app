import { IUser } from "../interfaces/user.interface";

///// Role-based Authorization //////
export function canRead(user: IUser): boolean {
    const allowed = ['admin', 'user']
    return checkAuthorization(user, allowed)
}

export function canEdit(user: IUser): boolean {
    const allowed = ['admin']
    return checkAuthorization(user, allowed)
}

export function canDelete(user: IUser): boolean {
    const allowed = ['admin']
    return checkAuthorization(user, allowed)
}

export function isAdmin(user: IUser): boolean {
    const allowed = ['admin']
    return checkAuthorization(user, allowed)
}

// determines if user has matching role
function checkAuthorization(user: IUser, allowedRoles: string[]): boolean {
    console.log(user)
    if (!user) return false
    for (const role of allowedRoles) {
        if (user.role === role) {
            return true
        }
    }
    return false
}