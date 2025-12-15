import { useMutation } from "@tanstack/react-query";
import { axiosInstance, Button } from "../shared";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CheckoutButton = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["clear cart"],
    mutationFn: async () => {
      const res = await axiosInstance.delete("/cart-items/clear/");

      return res.data;
    },
    onSuccess: () => {
      navigate("/");
      return toast.success("Submitted!");
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className="cart__checkout"
    >
      Checkout
    </Button>
  );
};
