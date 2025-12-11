import { useQuery } from "@tanstack/react-query";
import {
  axiosInstance,
  ErrorMessage,
  Skeleton,
  type IProduct,
} from "../shared";
import { Product } from "../entities";
import { ShopFilters } from "../features";

export const ShopPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<IProduct[]> => {
      const res = await axiosInstance.get("products/");

      return res.data;
    },
  });

  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="container shop">
      <ShopFilters />
      <div className="shop__list">
        {isPending
          ? [...new Array(6)].map((_, index) => (
              <Skeleton width="100%" height="350px" key={index} />
            ))
          : data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};
