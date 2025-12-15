import { Product } from "../entities";
import { Skeleton, useUser } from "../shared";

export const ProfileFavoritesList = () => {
  const { user, isPending } = useUser();
  return (
    <div className="favorites__list">
      {isPending ? (
        [...new Array(5)].map((_, index) => (
          <Skeleton width="100%" height="300px" key={index} />
        ))
      ) : user?.favorites && user.favorites.length > 0 ? (
        user.favorites.map((fav) => (
          <Product key={fav.id} product={fav.product} />
        ))
      ) : (
        <p>You don't have favorites yet!</p>
      )}
    </div>
  );
};
