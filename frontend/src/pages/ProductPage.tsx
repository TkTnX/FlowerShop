import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  axiosInstance,
  Block,
  Button,
  Skeleton,
  type IProduct,
} from "../shared";

export const ProductPage = () => {
  const params = useParams();
  const productId = params.productId;
  console.log(params);

  const { data, isPending, error } = useQuery({
    queryKey: ["get product", productId],
    queryFn: async (): Promise<IProduct> => {
      const res = await axiosInstance.get(`/products/${productId}`);

      return res.data;
    },
  });
    
    // TODO: Получать с продуктом reviews
    // TODO: Вынести в отдельный компонент этот код ниже
    // TODO: Закончить страницу products

  if (error) return <p>Что-то пошло не так!</p>;
  return (
    <section className="container">
      {isPending ? (
        <Skeleton width={"100%"} height={"300px"} />
      ) : (
        <Block className="bigProduct">
          <div className="bigProduct__left">
            <img
              src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${data.images}`}
              alt={data.title}
            />
          </div>
          <div className="bigProduct__right">
            <h4 className="product__title">{data.title}</h4>
            <p className="product__desc">{data.description}</p>
            <div>
              <div className="product__rating">
                <img src="/images/star.svg" alt="Star" />
                <span>{data.rating}/5</span>
              </div>
              {/* TODO: TEMP NUM */}
              <p className="product__reviews-count">(101 people opinion)</p>
            </div>
            <div className="product__bottom">
              <p>{data.price}$ / each</p>

              <div className="product__controls">
                <Button variant={"outline"}>
                  <img src="/images/heart.svg" alt="heart" />
                  <span>Add to favorite</span>
                </Button>
                <Button>
                  <img src="/images/cart-light.svg" alt="Cart" />
                  <span>Add to cart</span>
                </Button>
              </div>
            </div>
          </div>
        </Block>
      )}
    </section>
  );
};
