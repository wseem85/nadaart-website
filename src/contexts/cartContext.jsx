import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

function cartReducer(state, action) {
  switch (action.type) {
    case "addToCart": {
      const cart = [...state, action.payload];
      toast.success("This Item is Added To Your Cart", { id: action.payload });
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case "removeFromCart": {
      const cart = state.filter((item) => item !== action.payload);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("This Item is Removed From Your Cart", {
        id: action.payload,
      });
      return cart;
    }
    case "clearCart": {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    }

    default:
      throw new Error("Unknown action type ");
  }
}
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
function useCart() {
  const context = useContext(CartContext);

  return context;
}
export { CartProvider, useCart };

CartProvider.propTypes = {

  children: PropTypes.element,
};
