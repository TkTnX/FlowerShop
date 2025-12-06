import type { IReview } from "./reviews.type"

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    rating: number
    // TODO: TEMP ONE IMAGE
    // images: string[]
    images: string
    reviews: IReview[]
}