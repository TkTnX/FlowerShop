import { Block, type ICart } from "../shared";
import { CartItem } from "./CartItem";

interface Props {
  cart: ICart;
}

export const Cart = ({ cart }: Props) => {
  return (
    <div className="container cart">
      {cart.cartItems.length > 0 ? (
        <Block>
          <h3 className="cart__title">Your Cart</h3>
          <div className="cart__list">
            {cart.cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
        </Block>
      ) : (
        <Block className="cart__empty">
          <img src="/images/cart.svg" />
        </Block>
      )}
    </div>
  );
};
