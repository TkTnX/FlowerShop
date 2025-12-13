import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  axiosInstance,
  ErrorMessage,
  Skeleton,
  type IProduct,
} from "../shared";
import { Product } from "../entities";
import { ShopFilters } from "../features";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["products", searchParams],
    queryFn: async (): Promise<IProduct[]> => {
      const res = await axiosInstance.get(
        `products/?${searchParams.toString()}`
      );

      return res.data;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products", searchParams] });
  }, [queryClient, searchParams]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="container shop">
      <ShopFilters />
      <div className="shop__list">
        {isPending ? (
          [...new Array(6)].map((_, index) => (
            <Skeleton width="100%" height="350px" key={index} />
          ))
        ) : data.length > 0 ? (
          data.map((product) => <Product key={product.id} product={product} />)
        ) : (
          <p>Nothing is found!</p>
        )}
      </div>
    </div>
  );
};
