export interface UserModel {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    picture: string
    createdAt: Date
    updatedAt: Date
}
