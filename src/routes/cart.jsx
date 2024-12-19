import { useQuery } from "@tanstack/react-query";
import { useCart } from "../contexts/cartContext";
import SectionHeading from "../ui/sectionHeading";
import Stack from "../ui/stack";
import PageContentContainer from "../ui/StyledPageContentContainer";
import { getPicturesInCart } from "../services/apiPictures";
import Button from "../ui/button";
import Loading from "../ui/loading";
import Error from "../ui/error";
import styled from "styled-components";
import CartItem from "../ui/cartItem";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import PropTypes from "prop-types";

const StyledCartItemsContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 1.7rem;
  margin-left: auto;
  margin-right: auto;

  padding: 1.7rem 0.5rem;
  max-width: 800px;
`;
const StyledSummaryContainer = styled.div`
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  max-width: 800px;
  margin-bottom: 4rem;

  & h4 {
    color: var(--color-grey-500);
  }
  & h5 {
    color: var(--color-grey-600);
    font-size: 1.5rem;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
`;
const StyledCartContainer = styled.div`
  background-color: var(--color-beige-100);
  display: grid;
  place-items: start;
  gap: 1.5rem;
  width: 100%;
  @media screen and (min-width: 991px) {
    grid-template-columns: 53% 44%;
    gap: 3%;
  }
`;

export default function Cart() {
  const { cart } = useCart();

  const makeCartQuery = Boolean(cart.length);

  const navigate = useNavigate();
  const {
    data: picturesInCart,
    isPending,
    fetchStatus,
    error,
    isError,
  } = useQuery({
    queryKey: ["picturesInCart", cart.length],
    queryFn: () => getPicturesInCart(cart),
    enabled: makeCartQuery,
  });
  const totalPrice = picturesInCart?.reduce((acc, cur) => {
    if (cur.discount) return acc + cur.price - (cur.price * cur.discount) / 100;
    else return acc + cur.price;
  }, 0);

  return (
    <div style={{ minHeight: "80vh" }}>
      <PageContentContainer>
        <SectionHeading>Your Cart</SectionHeading>
        <Stack direction="vertical" spacing="wider">
          {cart.length === 0 ? (
            <Stack
              direction="vertical"
              minwidth="100%"
              justify="center"
              align="center"
              spacing="wider"
            >
              <h3
                style={{
                  color: "var(--color-grey-500)",
                  marginBottom: "2rem",
                  fontSize: "1.8rem",
                  textTransform: "uppercase",
                }}
              >
                Your Cart is Empty
              </h3>
              <h4
                style={{
                  color: "var(--color-brand-700)",

                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                Start Collecting Art From My Store <br />
                And Get The Best Offers from Here
              </h4>

              <Button onClick={() => navigate("/artworks")}>
                Go To Store{" "}
              </Button>
              <div style={{ width: "1px", marginBottom: "16rem" }}></div>
            </Stack>
          ) : null}
          {fetchStatus === "fetching" ? <Loading /> : null}
          {isError ? <Error message={error.message} /> : null}
          {!isPending &&
          fetchStatus !== "fetching" &&
          picturesInCart?.length ? (
            <StyledCartContainer>
              <StyledCartItemsContainer>
                {picturesInCart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </StyledCartItemsContainer>
              <StyledSummaryContainer>
                <Stack direction="vertical" justify="center">
                  <Stack
                    direction="horizental"
                    spacing="wider"
                    justify="between"
                    minwidth="100%"
                  >
                    <h4>Total Artworks</h4>
                    <h5
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {cart.length} Items
                    </h5>
                  </Stack>
                  <Stack
                    direction="horizental"
                    spacing="wider"
                    justify="between"
                    style={{
                      color: "var(--color-grey-500)",
                      marginBottom: "2rem",
                      fontSize: "1.8rem",
                      textTransform: "uppercase",
                    }}
                    minWidth="100%"
                  >
                    <h4>Total Price</h4>
                    <h5 style={{ display: "flex", justifyContent: "center" }}>
                      ${totalPrice.toFixed(2)}
                    </h5>
                  </Stack>
                </Stack>

                <Stack direction="vertical" spacing="extremelyWide">
                  <Button
                    style={{
                      width: "100%",
                      borderRadius: "0",
                      marginTop: "1.5rem",
                    }}
                  >
                    CheckOut
                  </Button>
                  <Feature
                    icon={<FaStar style={{ width: "3rem", height: "3rem" }} />}
                    title="Thousands Of Five-Star Reviews"
                    desc="We deliver world-class customer service to all of our art buyers."
                  ></Feature>
                  <Feature
                    icon={
                      <AiOutlineSafety
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    }
                    title="Satisfaction Guaranteed"
                    desc="Our 14-day satisfaction guarantee allows you to buy with confidence."
                  ></Feature>
                  <Feature
                    icon={
                      <MdOutlineSecurity
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    }
                    title="Safe & Secure Shopping"
                    desc="All payments and transactions are secure and encrypted."
                  ></Feature>
                </Stack>
              </StyledSummaryContainer>
            </StyledCartContainer>
          ) : null}
        </Stack>
      </PageContentContainer>
    </div>
  );
}

const StyledFeatureContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  /* align-items: center; */
  & > svg {
    width: 2rem;
    height: 2rem;
  }
`;
const StyledTitle = styled.h6`
  font-size: 1.6rem;
  line-height: 1.6rem;
  font-weight: 500px;
`;
const StyledDesc = styled.p`
  /* font-size: 0.8125rem; */
  line-height: 2rem;
`;

function Feature({ icon, title, desc }) {
  return (
    <StyledFeatureContainer>
      {icon}
      <Stack direction="vertical" spacing="tight">
        <StyledTitle>{title}</StyledTitle>
        <StyledDesc>{desc}</StyledDesc>
      </Stack>
    </StyledFeatureContainer>
  );
}
Feature.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  desc: PropTypes.string,
};
