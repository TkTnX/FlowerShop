import { useMutation } from "@tanstack/react-query";
import { axiosInstance, Button } from "../shared";
import { toast } from "react-toastify";

interface Props {
  productId: number;
}

export const AddToCartButton = ({ productId }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["add to cart"],
    mutationFn: async () => {
      const res = await axiosInstance.post("/cart-items/add/", {
        productId,
      });

      return res.data;
    },
    onSuccess: () => {
      return toast.success("Added to cart");
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      className="product__button"
    >
      <img src="/images/cart-light.svg" alt="Cart" />
      <span>Add to cart</span>
    </Button>
  );
};
