import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilteredPictures, getPicture } from "../services/apiPictures";
import Spinner from "../ui/spinner";
import styled from "styled-components";

import Heading from "../ui/heading";
import Stack from "../ui/stack";

import Loading from "../ui/loading";
import { useCart } from "../contexts/cartContext";
import ButtonIconText from "../ui/buttonIconText";

import { FaCartArrowDown } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { BsCartDashFill } from "react-icons/bs";
import Error from "../ui/error";

const StyledPicturePageContiner = styled.div`
  padding: 0.7rem 1rem;
  position: relative;
  margin-bottom: 2.3rem;
  @media screen and (min-width: 550px) {
    padding: 1.3rem 2rem;
  }

  display: grid;

  align-content: center;
  gap: 1.3rem;
  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    align-content: start;
    margin-top: 1.3rem;
    min-height: unset;
    gap: 2rem;
  }
  @media screen and (min-width: 1024px) {
    gap: 3.5rem;
  }
`;

const StyledPicture = styled.img`
  object-fit: cover;
  aspect-ratio: 5/6;
  width: 100%;
  border: 5px solid var(--color-beige-500);
  box-shadow: var(--shadow-lg);
  @media screen and (min-width: 640px) {
    width: unset;
    height: 100%;
  }
  @media screen and (min-width: 870px) {
    height: unset;
    width: 100%;
  }
`;
const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 1024px) {
    padding-top: 3.2rem;
    gap: 1.3rem;
    /* font-size: 110%; */
  }
  @media screen and (min-width: 1124px) {
    font-size: 110%;
  }
`;
const StyledTitle = styled.h3`
  margin-top: 1.5rem;
  text-transform: uppercase;
  color: var(--color-grey-500);
  line-height: 1.5px;
  letter-spacing: 1.3px;
  font-weight: bold;
`;

const StyledTag = styled.div`
  color: var(--color-grey-700);
  line-height: 1.7;
  font-size: 1.5rem;
  letter-spacing: 1.2px;
  &::first-letter {
    color: var(--color-brand-300);
  }
`;
const StyledParagraph = styled.p`
  line-height: 1.4;
  text-align: left;
  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  padding-right: 0.4rem;
  @media screen and (min-width: 1024px) {
    font-size: 100%;
    margin-bottom: 0;
  }
  color: var(--color-grey-500);
  &::first-letter {
    font-weight: bold;

    color: var(--color-brand-300);
  }
`;
const StyledParagraphWithoutFirstLetterColored = styled(StyledParagraph)`
  margin-bottom: 0;
  &::first-letter {
    font-weight: normal;
    color: inherit;
  }
`;
const StyledExtrasContainer = styled.div`
  display: flex;
  gap: 1.3rem;
  padding: 0.7rem 1rem;

  margin-bottom: 2.3rem;
  @media screen and (min-width: 550px) {
    padding: 1.3rem 2rem;
  }
  flex-direction: column;
  width: 100%;

  & .similars > div {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    & > div {
      width: 125px;
      height: 150px;
      @media screen and (min-width: 992px) {
        width: 85px;
        height: 105px;
      }
      @media screen and (min-width: 1080px) {
        width: 100px;
        height: 120px;
      }
      @media screen and (min-width: 1124px) {
        width: 125px;
        height: 150px;
      }
      border: 1px solid var(--color-beige-500);
      box-shadow: var(--shadow-sm);
      background-color: var(--color-beige-300);
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        cursor: pointer;
        transition: 0.3s;
        width: 90%;
        height: 90%;

        &:hover {
          width: 100%;
          height: 100%;
        }
      }
    }
    /* grid-template-columns: 1fr 1fr; */
  }
`;
const StyledHeader = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  @media screen and (min-width: 640px) {
    gap: 3rem;
    padding: 1.3rem 2rem;
    flex-direction: row;
    justify-content: space-between;
  }
  align-items: center;
  padding: 0.7rem 1rem;

  @media screen and (min-width: 550px) {
    padding: 1.3rem 2rem;
  }
`;
const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.3rem;
  width: 100%;
  @media screen and (min-width: 640px) {
    width: unset;
    margin-top: 0.8rem;
  }
`;
export default function ArtWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    data: picture,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPicture(id),
  });
  const { cart, dispatch } = useCart();
  const {
    title,
    description,
    price,
    width,
    soldOut,
    height,
    discount,
    src,
    category,
  } = picture || {};
  const {
    data: filteredPictures,
    isPending: isPendingFilteredPictures,
    isError: isErrorFilteredPictures,
    error: errorFilteredPictures,
  } = useQuery({
    queryKey: ["filteredPictures", id],
    queryFn: () =>
      getFilteredPictures({
        categories: category,
      }),
    enabled: !!picture,
  });
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isPending) return <Spinner />;
  if (isError) return <Error message={error.message}></Error>;
  const finalFilteredPictures =
    filteredPictures?.length > 6
      ? filteredPictures.slice(0, 7)
      : filteredPictures;

  return (
    <div
      style={{
        marginLeft: windowWidth < 1024 ? "0" : "1.5rem",
        margin: windowWidth < 1024 ? "0" : "1.5rem",
      }}
    >
      <StyledHeader>
        <StyledTitle>
          {title}
          <span
            style={{
              backgroundColor: soldOut
                ? "var(--color-red-700)"
                : "var(--color-green-700)",
              color: "#fff",
              fontSize: "60%",

              marginLeft: "0.3rem",
            }}
          >
            {soldOut ? "Solded" : "Available"}
          </span>
        </StyledTitle>
        <StyledButtonsContainer>
          {!soldOut &&
            (!cart.includes(picture.id) ? (
              <ButtonIconText
                textcolor="var(--color-brand-700)"
                handler={() =>
                  dispatch({ type: "addToCart", payload: picture.id })
                }
                variation="outlined"
                size="medium"
                // className="cart"
              >
                <span>Add</span>

                <FaCartArrowDown />
              </ButtonIconText>
            ) : (
              <>
                {cart.includes(picture.id) ? (
                  <span
                    style={{
                      backgroundColor: soldOut
                        ? "var(--color-red-700)"
                        : "var(--color-green-700)",
                      lineHeight: "1.2",
                      textTransform: "uppercase",
                      fontSize: "80%",
                      color: "#fff",

                      marginLeft: "0.3rem",
                    }}
                  >
                    In Your Cart
                  </span>
                ) : null}
                <ButtonIconText
                  color="var(--color-beige-500)"
                  textcolor="var(--color-beige-700)"
                  handler={() =>
                    dispatch({ type: "removeFromCart", payload: picture.id })
                  }
                >
                  <span>Remove</span>

                  <BsCartDashFill />
                </ButtonIconText>
              </>
            ))}
          <ButtonIconText
            textcolor="var(--color-grey-500)"
            color="var(--color-grey-300)"
            handler={() => navigate(-1)}
          >
            <span>Back</span>
            <IoMdArrowBack />
          </ButtonIconText>
        </StyledButtonsContainer>
      </StyledHeader>

      <StyledPicturePageContiner>
        {/* <StyledPictureContainer> */}
        <StyledPicture src={src} />
        {/* </StyledPictureContainer> */}
        <StyledDetailsContainer>
          <Stack direction="horizental" spacing="tight" align="center">
            <Heading as="h3">Category:</Heading>
            <StyledTag>{category}</StyledTag>
          </Stack>
          <Stack direction="horizental" spacing="tight" align="center">
            <Heading as="h3">Size:</Heading>
            <div
              style={{
                color: "var(--color-grey-700)",
                lineHeight: "1.4",
                fontSize: "1.5rem",
              }}
            >
              {width}&quot; &times; {height}&quot;
            </div>
          </Stack>
          <Stack direction="horizental" align="center">
            <Heading as="h3">Price:</Heading>
            {!discount ? (
              <StyledParagraphWithoutFirstLetterColored>
                ${price}
              </StyledParagraphWithoutFirstLetterColored>
            ) : (
              <>
                <StyledParagraphWithoutFirstLetterColored
                  style={{ textDecoration: "line-through" }}
                >
                  ${price}
                </StyledParagraphWithoutFirstLetterColored>
                <StyledParagraphWithoutFirstLetterColored
                  style={{ color: "var(--color-green-700)" }}
                >
                  ${price - (price * discount) / 100}
                </StyledParagraphWithoutFirstLetterColored>
              </>
            )}
          </Stack>
          <Stack direction="vertical" spacing="tight">
            <Heading as="h3">How Is It Made ?</Heading>
            <StyledParagraph>{description}</StyledParagraph>
          </Stack>
          {windowWidth >= 992 ? (
            <>
              {isPendingFilteredPictures ? (
                <Loading />
              ) : !isPendingFilteredPictures && isErrorFilteredPictures ? (
                <p>{errorFilteredPictures}</p>
              ) : (
                <>
                  {filteredPictures?.length > 1 && (
                    <StyledExtrasContainer>
                      <div className="similars">
                        <h3
                          style={{
                            fontSize: "1.7rem",
                            color: "var(--color-grey-500)",
                            textAlign: "center",
                            marginBottom: "1.3rem",
                          }}
                        >
                          You May Also Like{" "}
                        </h3>
                        <div>
                          {finalFilteredPictures
                            ?.filter((item) => item.id !== +id && !item.soldOut)
                            ?.map((filteredPicture) => (
                              <div key={filteredPicture.id}>
                                {/* <Navigate to={`/artworks/${filteredPicture.id}`}> */}
                                <img
                                  onClick={() => {
                                    navigate(`/artworks/${filteredPicture.id}`);
                                  }}
                                  src={filteredPicture.src}
                                  style={{
                                    opacity: filteredPicture.soldOut
                                      ? "0.6"
                                      : "1",
                                  }}
                                />
                                {/* </Navigate> */}
                              </div>
                            ))}
                        </div>
                      </div>
                    </StyledExtrasContainer>
                  )}
                </>
              )}
            </>
          ) : null}
        </StyledDetailsContainer>
      </StyledPicturePageContiner>

      <>
        {windowWidth < 992 ? (
          <>
            {isPendingFilteredPictures ? (
              <Loading />
            ) : !isPendingFilteredPictures && isErrorFilteredPictures ? (
              <p>{errorFilteredPictures}</p>
            ) : (
              <>
                {filteredPictures?.length > 1 && (
                  <StyledExtrasContainer>
                    <div className="similars">
                      <h3
                        style={{
                          fontSize: "1.7rem",
                          color: "var(--color-grey-500)",
                          textAlign: "center",
                          marginBottom: "1.3rem",
                          marginTop: "2rem",
                        }}
                      >
                        You May Also Like{" "}
                      </h3>
                      <div>
                        {finalFilteredPictures
                          ?.filter((item) => item.id !== +id && !item.soldOut)
                          ?.map((filteredPicture) => (
                            <div key={filteredPicture.id}>
                              {/* <Navigate to={`/artworks/${filteredPicture.id}`}> */}
                              <img
                                onClick={() => {
                                  navigate(`/artworks/${filteredPicture.id}`);
                                }}
                                src={filteredPicture.src}
                                style={{
                                  opacity: filteredPicture.soldOut
                                    ? "0.6"
                                    : "1",
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </StyledExtrasContainer>
                )}
              </>
            )}
          </>
        ) : null}
      </>
    </div>
  );
}
