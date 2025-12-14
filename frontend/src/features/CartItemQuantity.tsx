import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../shared";

interface Props {
  quantity: number;
  cartItemId: number;
}

export const CartItemQuantity = ({ quantity, cartItemId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["change quantity"],
    mutationFn: async (action: "plus" | "minus") => {
      const res = await axiosInstance.patch("cart-items/quantity/", {
        action,
        cartItemId,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div className="cartItem__quantity">
      <button disabled={quantity === 1} onClick={() => mutate("minus")}>
        -
      </button>
      <p className="cartItem__quantity-num">{quantity}</p>
      <button onClick={() => mutate("plus")}>+</button>
    </div>
  );
};
