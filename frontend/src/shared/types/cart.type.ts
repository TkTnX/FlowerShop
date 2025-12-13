import type { ICartItem } from "./cartItem.type"

export interface ICart {
    id: number
    totalPrice: number
    user: number
    cartItems: ICartItem[]
}