import { Block, Button, type IProduct } from "../shared";

interface Props {
  product: IProduct;
}

export const ProductDetails = ({ product }: Props) => {
  return (
    <Block className="bigProduct">
      <div className="bigProduct__left">
        <img
          src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${
            product.images[0].image
          }`}
          alt={product.title}
        />
      </div>
      <div className="bigProduct__right">
        <h4 className="product__title">{product.title}</h4>
        <p className="product__desc">{product.description}</p>
        <div>
          <div className="product__rating">
            <img src="/images/star.svg" alt="Star" />
            <span>{product.rating}/5</span>
          </div>
          <p className="product__reviews-count">
            ({product.reviews.length} people opinion)
          </p>
        </div>
        <div className="product__bottom">
          <p>{product.price}$ / each</p>

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
  );
};
