import { useQuery } from "@tanstack/react-query";
import { axiosInstance, Skeleton, useUser, type IReview } from "../shared";
import { Review } from "../entities";

export const ProfileReviewsPage = () => {
  const { user, isPending: isUserPending } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["user reviews", user],
    queryFn: async (): Promise<IReview[]> => {
      const res = await axiosInstance.get("/reviews/user-reviews/");

      return res.data;
    },
    enabled: !isUserPending,
  });

  return (
    <div className="profileReviews">
      <h2 className="profileReviews__title">User Reviews List</h2>
      <div className="profileReviews__list">
        {isPending
          ? [...new Array(6)].map((_, index) => (
              <Skeleton key={index} width="100%" height="300px" />
            ))
          : data?.map((review) => (
              <Review
                className="profileReviews__item"
                key={review.id}
                review={review}
              />
            ))}
      </div>
    </div>
  );
};
