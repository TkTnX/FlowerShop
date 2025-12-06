import type { IUser } from "./user.type"

export interface IReview {
    id: number
    product: number
    rating: number
    text: string
    user: IUser
}