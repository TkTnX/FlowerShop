import type { IProduct } from "./product.type"

export interface IFavorite {
    id: number
    product: IProduct
    user: number
}