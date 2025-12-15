import { useForm } from "react-hook-form";
import { Button, Modal } from "../ui";
import { reviewSchema, type ReviewSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../libs";

interface Props {
  setOpen: (bool: boolean) => void;
  open: boolean;
  productId: number;
}


export const AddReviewModal = ({ setOpen, open, productId }: Props) => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["Add review"],
    mutationFn: async (values: ReviewSchema) => {
      const res = await axiosInstance.post(
        `/reviews/${productId}/create/`,
        values
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get product", productId],
      });
      setOpen(false);
    },
  });

  const onSubmit = (values: ReviewSchema) => {
    mutate(values);
  };

  return (
    <Modal setOpen={setOpen} open={open} className="addReview">
      <h4 className="addReview__title">Add a review</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm__form">
        <textarea
          disabled={isPending}
          placeholder="Your review"
          className="authForm__input"
          {...register("text")}
        />
        {errors.text && <p className="error-message">{errors.text.message}</p>}
        <input
          disabled={isPending}
          placeholder="Rating"
          type="number"
          max={5}
          min={1}
          className="authForm__input"
          {...register("rating", { valueAsNumber: true })}
        />
        {errors.rating && (
          <p className="error-message">{errors.rating.message}</p>
        )}

        <Button
          disabled={isPending}
          type={"submit"}
          className="authForm__button"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};
