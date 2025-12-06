import { useQuery } from "@tanstack/react-query";
import { Product } from "../entities";
import { ErrorMessage, Section, Skeleton } from "../shared/components";
import { axiosInstance, type IProduct } from "../shared";

export const BestSellers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<IProduct[]> => {
      const res = await axiosInstance.get("/products");
      return res.data;
    },
  });

  if (error) return <ErrorMessage error={error} />;

  return (
    <Section className="bestSellers__list" title="Best Sellers">
      {isPending ? (
        [...new Array(4)].map((_, index) => (
          <Skeleton width="100%" height="280px" key={index} />
        ))
      ) : data.length > 0 ? (
        data.map((product) => <Product key={product.id} product={product} />)
      ) : (
        <p>No products!</p>
      )}
    </Section>
  );
};
