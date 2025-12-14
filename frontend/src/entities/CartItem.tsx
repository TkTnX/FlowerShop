import type { ICartItem } from "../shared";
import { CartItemQuantity, DeleteCartItem } from "../features";

interface Props {
  cartItem: ICartItem;
}
export const CartItem = ({ cartItem }: Props) => {
  const product = cartItem.product;
  return (
    <div className="cartItem">
      <img
        className="cartItem__img"
        src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${
          product.images[0].image
        }`}
        alt={product.title}
      />
      <div className="cartItem__info">
        <div className="cartItem__top">
          <div className="cartItem__text">
            <h4 className="cartItem__title">{product.title}</h4>
            <p className="cartItem__desc">
              {product.description.slice(0, 100)}...
            </p>
          </div>
          <DeleteCartItem cartItemId={cartItem.id} />
        </div>
        <div className="cartItem__bottom">
          <div className="cartItem__price">
            <p className="cartItem__unit">{product.price}$/unit</p>
            <CartItemQuantity
              quantity={cartItem.quantity}
              cartItemId={cartItem.id}
            />
          </div>
          <p className="cartItem__total">
            Total {product.price * cartItem.quantity}$
          </p>
        </div>
      </div>
    </div>
  );
};
