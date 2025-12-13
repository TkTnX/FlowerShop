import type { IProduct } from "./product.type"

export interface ICartItem {
    id: number
    cart: number
    product: IProduct
    quantity: number
}