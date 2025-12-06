import type { IReview } from "../shared";

interface Props {
  review: IReview;
}

export const Review = ({ review }: Props) => {
  return (
    <div className="review">
      <div className="review__image">
        <img
          src={
            review.user.avatar
              ? `${import.meta.env.VITE_PUBLIC_SERVER_MEDIA_URL}${
                  review.user.avatar
                }`
              : "/images/no-avatar.png"
          }
          alt="Avatar"
        />
      </div>
      <div className="review__info">
        <p className="review__username">{review.user.username}</p>
        <p className="review__text">{review.text}</p>
        <div className="review__rating">
          {[new Array(review.rating)].map((_, index) => (
            <img src="/images/star.svg" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
