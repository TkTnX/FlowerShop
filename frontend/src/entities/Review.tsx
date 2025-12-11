import { Link, useLocation } from "react-router-dom";
import type { IReview } from "../shared";
import { LinkIcon } from "lucide-react";

interface Props {
  review: IReview;
  className?: string;
}

export const Review = ({ review, className }: Props) => {
  const location = useLocation();
  return (
    <div className={`review ${className}`}>
      <div className="review__image">
        <img
          src={
            review.user.avatar
              ? `${import.meta.env.VITE_PUBLIC_SERVER_URL}${review.user.avatar}`
              : "/images/no-avatar.png"
          }
          alt="Avatar"
        />
      </div>
      <div className="review__info">
        <p className="review__username">{review.user.username}</p>
        <p className="review__text">{review.text.slice(0, 300)}</p>
        <div className="review__rating">
          {[...new Array(review.rating)].map((_, index) => (
            <img src="/images/star.svg" key={index} />
          ))}
          {[...new Array(5 - review.rating)].map((_, index) => (
            <img src="/images/star-gray.svg" key={index} />
          ))}
        </div>
      </div>
      {!location.pathname.includes("shop") && (
        <Link className="review__link" to={`/shop/${review.product}`}>
          <LinkIcon />
          Check
        </Link>
      )}
    </div>
  );
};
