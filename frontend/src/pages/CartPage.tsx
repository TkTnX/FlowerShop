import { useQuery } from "@tanstack/react-query";
import { axiosInstance, ErrorMessage, Skeleton } from "../shared";
import { Cart } from "../entities";

export const CartPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("cart/");
      return res.data;
    },
  });

  if (error) return <ErrorMessage error={error} />;
  console.log(data);
  return (
    <>
      {isPending ? (
        <Skeleton className="container cart" width="100%" height="300px" />
      ) : (
        <Cart cart={data} />
      )}
    </>
  );
};
