import styled from "styled-components";
import Stack from "./stack";
import Button from "./button";
import Heading from "./heading";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1.5rem;
  background-color: var(--color-beige-100);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  box-shadow: var(--shadow-md);
  /* height: 400px; */
`;
const StyledImageContainer = styled.div`
  height: 70%;
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StyledImage = styled.img`
  height: 100%;
  aspect-ratio: 5/6;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
`;
const StyledOldPrice = styled.span`
  color: var(--color-grey-500);
  letter-spacing: 1.1px;
  text-decoration: line-through;
`;
const StyledNewPrice = styled.span`
  color: var(--color-grey-800);
  font-weight: 700;
  letter-spacing: 1.1px;
  color: var(--color-green-700);
`;
const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;
const StyledInStoreTag = styled.span`
  position: absolute;
  z-index: 1;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  top: 10%;
  left: 0;
  background-color: ${(props) =>
    props.availability === "available"
      ? "var(--color-brand-700)"
      : "var(--color-red-700)"};
  color: white;
  /* width: 65px; */
`;
const StyledSaleTag = styled.span`
  position: absolute;
  z-index: 1;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  top: 20%;
  left: 0;
  background-color: var(--color-green-700);
  color: white;
`;
export default function NewArtworkCard({ picture }) {
  const { id, soldOut, title, src, discount, height, width, price } = picture;
  const { cart, dispatch } = useCart();
  return (
    <StyledCardContainer>
      <StyledInStoreTag availability={soldOut ? "soldOut" : "available"}>
        {soldOut ? "Sold Out" : "Available"}
      </StyledInStoreTag>
      {discount !== 0 ? <StyledSaleTag>Sale {discount} %</StyledSaleTag> : null}
      <Link to={`artworks/${id}`}>
        <StyledImageContainer>
          <StyledImage src={src} alt={title} />
        </StyledImageContainer>
      </Link>
      <StyledDescription>
        <Stack direction="horizental" justify="between" align="center">
          <Heading as="h3">{title}</Heading>
          <Heading as="h4">
            {width}&Prime;
            <span style={{ color: "var(--color-grey-500)" }}> x </span> {height}
            &Prime;
          </Heading>
        </Stack>
        <Stack direction="horizental" justify="between" align="center">
          {discount ? (
            <Stack direction="horizental" spacing="wide">
              <StyledOldPrice>${price}</StyledOldPrice>
              <StyledNewPrice>
                ${price - price * (discount / 100)}
              </StyledNewPrice>
            </Stack>
          ) : (
            <StyledNewPrice>${price}</StyledNewPrice>
          )}

          {!soldOut ? (
            !cart?.includes(id) ? (
              <Button
                onClick={() => dispatch({ type: "addToCart", payload: id })}
                variation="outlined"
                size="small"
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                onClick={() =>
                  dispatch({ type: "removeFromCart", payload: id })
                }
                variation="outlined"
                size="small"
                style={{
                  color: "var(--color-beige-700)",
                  borderColor: "var(--color-beige-700)",
                }}
              >
                Remove From Cart
              </Button>
            )
          ) : null}
        </Stack>
      </StyledDescription>
    </StyledCardContainer>
  );
}

NewArtworkCard.propTypes = {
  picture: PropTypes.object,
  src: PropTypes.string,
  title: PropTypes.string,
  discount: PropTypes.number,
  pric: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
