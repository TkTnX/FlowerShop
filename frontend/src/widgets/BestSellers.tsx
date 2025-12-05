import { useQuery } from "@tanstack/react-query";
import { Product } from "../entities";
import { Section } from "../shared/components";
import { axiosInstance, type IProduct } from "../shared";

export const BestSellers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<IProduct[]> => {
      const res = await axiosInstance.get("/products");
      return res.data
    },
  });

  // TODO: ERROR message
  if (error) return <p>Что-то пошло не так!</p>;

  return (
    <Section className="bestSellers__list" title="Best Sellers">
      {isPending ? (
        [...new Array(4)].map((_, index) => <div key={index} />)
      ) : data.length > 0 ? (
        data.map((product) => <Product key={product.id} product={product} />)
      ) : (
        <p>Продуктов нет!</p>
      )}
    </Section>
  );
};
