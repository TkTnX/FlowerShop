import type { ImageType } from "./image.type";
import type { IReview } from "./reviews.type";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  images: ImageType[];
  reviews: IReview[];
}
