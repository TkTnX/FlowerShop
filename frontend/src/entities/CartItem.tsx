import { Trash } from "lucide-react";
import type { ICartItem } from "../shared";

interface Props {
  cartItem: ICartItem;
}
// TODO: Доделать функционал корзины (добавление в корзину, удаление из корзины, подсчёт total price, изменение quantity)
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
          <button className="cartItem__delete">
            <Trash />
          </button>
        </div>
        <div className="cartItem__bottom">
          <div className="cartItem__price">
            <p className="cartItem__unit">{product.price}$/unit</p>
            <div className="cartItem__quantity">
              <button>-</button>
              <p className="cartItem__quantity-num">{cartItem.quantity}</p>
              <button>+</button>
            </div>
          </div>
          <p className="cartItem__total">
            Total {product.price * cartItem.quantity}$
          </p>
        </div>
      </div>
    </div>
  );
};
