import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance, Button, useUser } from "../shared";

interface Props {
  productId: number;
}

export const AddToFavorites = ({ productId }: Props) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const isAddedToFav = user?.favorites.find(
    (favItem) => favItem.product.id === productId
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["add to fav"],
    mutationFn: async () => {
      const res = await axiosInstance.post(`favorites/${productId}/`);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      variant={isAddedToFav ? "default" : "outline"}
    >
      <img
        src={`/images/${isAddedToFav ? "heart-white" : "heart"}.svg`}
        alt="heart"
      />
      <span>{isAddedToFav ? "Added to favorites" : "Add to favorites"}</span>
    </Button>
  );
};
