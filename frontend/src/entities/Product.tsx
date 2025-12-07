import { Link } from "react-router-dom";
import type { IProduct } from "../shared";

interface Props {
  product: IProduct;
}

export const Product = ({ product }: Props) => {
  return (
    <div className="product">
      <Link to={`/shop/${product.id}`} className="product__link" />
      {product.images[0] && (
        <div className="product__image">
          <img
            src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${
              product.images[0].image
            }`}
            alt={product.title}
          />
        </div>
      )}
      <div className="product__info">
        <div className="product__top">
          <h6 className="product__title">{product.title}</h6>
          <div className="product__rating">
            <img src="/images/star.svg" alt="Star" />
            <span className="product__number">{product.rating}/5</span>
          </div>
        </div>
        <p className="product__desc">{product.description.slice(0, 50)}...</p>
        <div className="product__bottom">
          <p className="product__price">{product.price}$/each</p>

          <button className="product__button">
            <img src="/images/cart.svg" alt="Cart" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
