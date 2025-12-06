import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  axiosInstance,
  ErrorMessage,
  Skeleton,
  type IProduct,
} from "../shared";
import { MorePhotos, ProductDetails, ProductReviewsList } from "../widgets";

export const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;

  const { data, isPending, error } = useQuery({
    queryKey: ["get product", productId],
    queryFn: async (): Promise<IProduct> => {
      const res = await axiosInstance.get(`/products/${productId}`);

      return res.data;
    },
  });

  if (error) return <ErrorMessage error={error} />;
  return (
    <section className="container">
      {isPending ? (
        <Skeleton width={"100%"} height={"300px"} />
      ) : (
        <ProductDetails product={data} />
      )}
      <div className="bigProduct__details">
        {isPending ? (
          <Skeleton width="100%" height="564px" />
        ) : (
          <ProductReviewsList reviews={data.reviews} />
        )}
        {isPending ? (
          <Skeleton width="100%" height="564px" />
        ) : (
          <MorePhotos images={data.images} />
        )}
      </div>
    </section>
  );
};
