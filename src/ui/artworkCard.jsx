import styled from "styled-components";
import Heading from "./heading";

import { BiCartAdd } from "react-icons/bi";
import { MdReadMore } from "react-icons/md";
import { useFilters } from "../contexts/filtersContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { BsCartCheck } from "react-icons/bs";
import PropTypes from "prop-types";
const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 700px) {
    flex-direction: row;

    justify-content: space-between;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: column;
  }
  & > h3 {
    letter-spacing: var(--letter-space-md);
    color: var(--color-grey-500);
    text-transform: uppercase;
    justify-self: flex-start;
  }
  & > div {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    @media screen and (min-width: 1024px) {
      width: 100%;
    }
  }
  & > div > button {
    border-radius: var(--border-radius-md);
    background-color: var(--color-brand-700);
    border: 1px solid var(--color-grey-50);
    color: white;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 1rem;
    outline: none;
    border: 1px solid var(--color-beige-500);
    &:hover {
      background-color: var(--color-brand-500);
      color: white;
      box-shadow: var(--shadow-md);
    }
    & > svg {
      color: "#fff";
      font-size: 2.3rem;
    }
  }
`;
const StyledCardContainer = styled.div`
  display: grid;
  gap: 2.3rem;

  background-color: white;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const StyledImageContainer = styled.div`
  background-color: var(--color-beige-300);
  padding: 1rem 1rem 1rem 0;
  width: 100%;

  aspect-ratio: 5/6;
  border-radius: var(--border-radius-md);

  @media screen and (min-width: 800px) {
    min-width: 50%;
    width: unset;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > button {
    position: absolute;
    background-color: var(--color-brand-700);
    color: white;
    border: none;
    outline: none;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100px;
    padding: 0.3rem 0.7rem;
  }
  & > span.availability {
    position: absolute;
    top: 10%;
    left: 0;
    color: white;
    width: 20px;
    height: 20px;
    overflow: hidden;
    padding: 1rem;
    z-index: 100;
    background-color: ${(props) =>
      props.$availability === "inStore"
        ? "var(--color-green-700)"
        : "var(--color-red-700)"};
  }
`;
const StyledDetailsContainer = styled.div`
  @media screen and (min-width: 800px) {
    min-width: 50%;
  }
  @media screen and (min-width: 1024px) {
    max-width: 100%;
  }

  display: flex;
  gap: 0.7rem;
  flex-direction: column;
  & > div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const StyledParagraph = styled.div`
  line-height: 1.2;
  color: var(--color-grey-500);
`;
export default function ArtworkCard({ picture }) {
  const {
    id,
    title,
    dimenitions,
    soldOut,
    price,
    src,
    category,
    height,
    width,
    discount,
    description,
  } = picture;
  const navigate = useNavigate();
  const { dispatch } = useFilters();
  const { cart, dispatch: dispatchCart } = useCart();

  function handleAddToCart() {
    dispatchCart({ type: "addToCart", payload: id });
  }
  function handleRemoveFromCart() {
    dispatchCart({ type: "removeFromCart", payload: id });
  }
  function handleSearchForSimilars() {
    dispatch({
      type: "setSpecificFilters",
      payload: {
        category: category,
        size: dimenitions,
        price:
          price < 500
            ? 500
            : price < 1000
            ? 1000
            : price < 2000
            ? 2000
            : price < 3000
            ? 3000
            : "",
      },
    });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",

        backgroundColor: "#fff",

        borderRadius: "var(--border-radius-sm)",
        padding: "2rem",
        borderBottom: "4px solid var(--color-beige-500)",
        boxShadow: "0 6px 4px -6px rgba(177, 116, 87, 0.6)",
      }}
    >
      <StyledCardHeader>
        <h3>
          {title}{" "}
          <span
            style={{
              backgroundColor: soldOut
                ? "var(--color-red-700)"
                : "var(--color-green-700)",
              fontSize: "60%",
              color: "white",
            }}
          >
            {soldOut ? "Sold Out" : "In Store"}
          </span>
        </h3>
        <div>
          {!soldOut ? (
            !cart.includes(id) ? (
              <button onClick={() => handleAddToCart()}>
                <BiCartAdd />
              </button>
            ) : (
              <button
                onClick={() => handleRemoveFromCart()}
                style={{ backgroundColor: "var(--color-beige-700)" }}
              >
                <BsCartCheck />
              </button>
            )
          ) : (
            <button onClick={() => handleSearchForSimilars()}>
              Similar Artworks
            </button>
          )}
          <button onClick={() => navigate(`${id}`)}>
            <MdReadMore />
          </button>
        </div>
      </StyledCardHeader>
      <StyledCardContainer>
        <Link onClick={() => navigate(`${id}`)}>
          <StyledImageContainer
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
          ></StyledImageContainer>
        </Link>
        <StyledDetailsContainer>
          <div>
            <Heading as="h4">Category:</Heading>
            <span>{category}</span>
          </div>
          <div>
            <Heading as="h4">Dimenitions:</Heading>
            <span>
              {width}&Prime; &times; {height}&Prime;
            </span>
          </div>
          <div>
            <Heading as="h4">Price:</Heading>
            {discount ? (
              <div style={{ display: "flex", gap: "1rem" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "var(--color-grey-500)",
                  }}
                >
                  ${price}
                </span>
                <span style={{ color: "var(--color-green-700)" }}>
                  ${price - (price * discount) / 100}
                </span>
              </div>
            ) : (
              <span>${price}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            <Heading as="h4" style={{ textAlign: "start" }}>
              Description:
            </Heading>
            <StyledParagraph>{description}</StyledParagraph>
          </div>
        </StyledDetailsContainer>
      </StyledCardContainer>
    </div>
  );
}

ArtworkCard.propTypes = {
  picture: PropTypes.object,
  id: PropTypes.number,
  title: PropTypes.string,
  dimenitions: PropTypes.string,
  soldOut: PropTypes.bool,
  price: PropTypes.number,
  src: PropTypes.string,
  category: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  discount: PropTypes.string,
  description: PropTypes.string,
};
