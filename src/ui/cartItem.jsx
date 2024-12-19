import styled from "styled-components";
import Button from "./button";
import { useCart } from "../contexts/cartContext";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

const StyledContainer = styled.div`
  display: flex;
  padding: 1.2rem 1.3rem;
  font-size: 80%;
  border-bottom: 1px solid var(--color-beige-500);
  @media screen and (min-width: 500px) {
    font-size: 90%;
  }
  gap: 1.5rem;
  align-items: center;
  & > * {
    font-size: inherit;
  }
  & > .imgContainer {
    width: 60px;
    height: 70px;
    @media screen and (min-width: 400px) {
      width: 80px;
      height: 90px;
    }

    padding: 1.3rem;
    background-color: var(--color-beige-500);
  }

  & > h4 {
    color: var(--color-brand-900);
    font-weight: bold;
    letter-spacing: 1.1px;
  }
`;

export default function CartItem({ cartItem }) {
  const { id, src, title, discount, price } = cartItem;
  const { dispatch } = useCart();
  return (
    <StyledContainer>
      <div
        className="imgContainer"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <h4 style={{ minWidth: "30%", textTransform: "capitalize" }}>{title}</h4>

      <h4>
        ${discount ? (price - (price * discount) / 100).toFixed(1) : price}
      </h4>
      <Button
        onClick={() => dispatch({ type: "removeFromCart", payload: id })}
        variation="plainlink"
        style={{
          backgroundColor: "var(--color-red-700)",
          borderBottom: "none",
          marginLeft: "auto",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.3rem",
        }}
      >
        <MdClose style={{ color: "#fff" }} />
      </Button>
    </StyledContainer>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
  id: PropTypes.number,
  src: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
};
