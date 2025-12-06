import { useQuery } from "@tanstack/react-query";
import {
  axiosInstance,
  ErrorMessage,
  Section,
  Skeleton,
  type IReview,
} from "../shared";
import { Review } from "../entities";

export const LastReviews = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["get last 3 reviews"],
    queryFn: async (): Promise<IReview[]> => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  if (error) return <ErrorMessage error={error} />;
  return (
    <Section className="bestSellers__list" title="Last Comments">
      {isPending ? (
        [...new Array(4)].map((_, index) => (
          <Skeleton width="100%" height="280px" key={index} />
        ))
      ) : data.length > 0 ? (
        data.map((review) => (
          <Review className="lastReviews__review" key={review.id} review={review} />
        ))
      ) : (
        <p>No reviews!</p>
      )}
    </Section>
  );
};
