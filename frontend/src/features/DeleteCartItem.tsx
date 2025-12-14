import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { axiosInstance } from "../shared";

interface Props {
  cartItemId: number;
}

export const DeleteCartItem = ({ cartItemId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete cart item"],
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        `cart-items/delete/${cartItemId}/`
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={() => mutate()}
      className="cartItem__delete"
    >
      <Trash />
    </button>
  );
};
