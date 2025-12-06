import { Review } from "../entities";
import { Block, type IReview } from "../shared";

interface Props {
  reviews: IReview[];
}

export const ProductReviewsList = ({ reviews }: Props) => {
  return (
    <Block className="productReviews">
      <div className="productReviews__top">
        <p className="productReviews__title">Reviews</p>
        <button className="productReviews__button">Add a review</button>
      </div>
      <div className="productReviews__list">
        {reviews.length > 0 ? (
          reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
          <p className="productReviews__">Отзывов нет</p>
        )}
      </div>
    </Block>
  );
};
