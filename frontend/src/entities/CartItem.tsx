import { Trash } from "lucide-react";
import type { ICartItem } from "../shared";

interface Props {
  cartItem: ICartItem;
}

export const CartItem = ({ cartItem }: Props) => {
  const product = cartItem.product;
  return (
    <div className="">
      <img
        src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${
          product.images[0].image
        }`}
        alt={product.title}
      />
      <div>
        <div>
          <div>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
          </div>
          <button>
            <Trash />
          </button>
        </div>
        <div>
          <div>
            <p>{product.price}$/unit</p>
            <div>
              <button>-</button>
              <p>{cartItem.quantity}</p>
              <button>+</button>
            </div>
          </div>
          <p>Total {product.price * cartItem.quantity}$</p>
        </div>
      </div>
    </div>
  );
};
