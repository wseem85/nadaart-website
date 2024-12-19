import styled from "styled-components";
import HeroArtworks from "../ui/introArtworks";

import SectionHeading from "../ui/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import { getPictures } from "../services/apiPictures";
import { useEffect } from "react";
import { useFilters } from "../contexts/filtersContext";
import ArtworkCard from "../ui/artworkCard";
import { useSearchParams } from "react-router-dom";
import { useFilteredPictures } from "../hooks/useFilteredPictures";
import Spinner from "../ui/spinner";
import Loading from "../ui/loading";
import Heading from "../ui/heading";
import PageContentContainer from "../ui/StyledPageContentContainer";
import Stack from "../ui/stack";
import Error from "../ui/error";
const StyledFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1rem;
`;
const StyledFiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const StyledFilterButton = styled.button`
  border: 1px solid var(--color-grey-300);
  padding: 0.3rem 0.6rem;
  font-size: 80%;
  @media screen and (min-width: 640px) {
    padding: 0.5rem 0.8rem;
    font-size: 90%;
  }
  background-color: transparent;
  border-radius: var(--border-radius-lg);
  transition: 0.3s;
  &.active {
    background-color: var(--color-brand-300);
    color: #fff;
  }
  outline: none;
`;
const StyledArtworksContainer = styled.div`
  display: grid;
  gap: 2rem;
  min-height: 200px;
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  background-color: var(--color-beige-300);
  @media screen and (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default function ArtWorks() {
  const [searchParams, setSearchParams] = useSearchParams();
  // setSearchParams({ filter: "All" });
  const {
    data: images,
    isPending: isPendingAllImages,
    error: allImagesError,
    isError: allImagesIsError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getPictures,
  });
  const {
    isPending,
    error: filteredPicturesError,
    isError: filteredPicturesIsError,
    filteredSortedImages: filteredImages,
  } = useFilteredPictures();
  const { filters, dispatch } = useFilters();
  const isAnyFiltersApplied =
    filters.categories.length ||
    filters.sizes.length ||
    filters.price ||
    filters.availability;
  useEffect(
    function () {
      if (filters.categories.length) {
        const encodedCategories = filters.categories.map((value) =>
          encodeURIComponent(value)
        );
        searchParams.set("categories", encodedCategories.join(","));
      } else {
        searchParams.delete("categories");
      }
      if (filters.sizes.length) {
        const encodedSizes = filters.sizes.map((el) => encodeURIComponent(el));
        searchParams.set("sizes", encodedSizes.join(","));
      } else {
        searchParams.delete("sizes");
      }
      if (!filters.price) {
        searchParams.delete("price");
      }
      if (filters.price === 500) {
        searchParams.set("price", "500");
      }
      if (filters.price === 1000) {
        searchParams.set("price", "1000");
      }
      if (filters.price === 2000) {
        searchParams.set("price", "2000");
      }
      if (filters.price === 3000) {
        searchParams.set("price", "3000");
      }
      if (filters.availability === "In Store") {
        searchParams.set("availability", "inStore");
      }
      if (filters.availability === "Sold Out") {
        searchParams.set("availability", "soldout");
      }
      if (!filters.availability) {
        searchParams.delete("availability");
      }
      setSearchParams(searchParams);
    },
    [
      filters.availability,
      filters.sizes,
      filters.categories,
      filters.price,
      searchParams,
      setSearchParams,
    ]
  );

  if (isPendingAllImages) return <Spinner />;
  // console.log(images);
  const categories = Array.from(new Set(images.map((el) => el.category)));
  const sizes = Array.from(new Set(images.map((el) => el.dimenitions)));

  const discounts = Array.from(
    new Set(images.map((el) => el.discount).sort((a, b) => a - b))
  )
    .filter((el) => el !== 0)
    .map((el) => `Sale ${el}%`);
  const availabilities = ["In Store", "Sold Out"];
  return (
    <div>
      <HeroArtworks
        categories={categories}
        sizes={sizes}
        discounts={discounts}
      />

      <PageContentContainer>
        <SectionHeading>ArtWorks</SectionHeading>
        <StyledFiltersContainer>
          <StyledFiltersRow>
            <StyledFilterButton
              className={
                filters.sizes.length === 0 &&
                filters.categories.length === 0 &&
                !filters.price
                  ? "active"
                  : ""
              }
              onClick={() => dispatch({ type: "clearAll" })}
            >
              All
            </StyledFilterButton>
            {availabilities.map((item) => (
              <StyledFilterButton
                className={filters.availability === item ? "active" : ""}
                key={item}
                onClick={() => {
                  if (filters.availability === item) {
                    dispatch({ type: "editAvailability" });
                  } else {
                    dispatch({ type: "editAvailability", payload: item });
                  }
                }}
              >
                {item}
              </StyledFilterButton>
            ))}
          </StyledFiltersRow>
          <StyledFiltersRow>
            {categories.map((el) => (
              <StyledFilterButton
                className={
                  filters.categories.find((item) => item === el) ? "active" : ""
                }
                key={el}
                el={el}
                onClick={() => {
                  dispatch({ type: "editCategories", payload: el });
                }}
              >
                {el}
              </StyledFilterButton>
            ))}
          </StyledFiltersRow>
          <StyledFiltersRow>
            {sizes.map((el) => (
              <StyledFilterButton
                className={
                  filters.sizes.find((item) => item === el) ? "active" : ""
                }
                key={el}
                onClick={() => dispatch({ type: "editSizes", payload: el })}
              >
                {el}
              </StyledFilterButton>
            ))}
          </StyledFiltersRow>
          <StyledFiltersRow>
            {[500, 1000, 2000, 3000].map((el) => (
              <StyledFilterButton
                key={el}
                className={filters.price === el ? "active" : ""}
                onClick={() => {
                  if (filters.price !== el)
                    dispatch({ type: "editPrice", payload: el });
                  else dispatch({ type: "removePrice" });
                }}
              >
                Less than {el}$
              </StyledFilterButton>
            ))}
          </StyledFiltersRow>
        </StyledFiltersContainer>
        {isPending ? (
          <div style={{ marginBottom: "15rem" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                alignItems: "center",
                backgroundColor: "var(--color-brand-700)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <Heading
                as="h3"
                style={{
                  textAlign: "center",
                  color: "var(--color-grey-100)",
                }}
              >
                {filteredImages.length} Products
              </Heading>
              {isAnyFiltersApplied ? (
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "1.3rem" }}
                >
                  {filters.categories.length ? (
                    <Stack
                      direction="horizental"
                      spacing="tight"
                      align="center"
                    >
                      <Heading
                        as="h5"
                        style={{ color: "var(--color-grey-100)" }}
                      >
                        Categories:
                      </Heading>
                      {filters.categories.map((category) => (
                        <span
                          key={category}
                          style={{
                            color: "var(--color-grey-700)",
                            backgroundColor: "var(--color-grey-100)",
                            borderRadius: "5px",
                            padding: "0.2rem",
                            fontSize: "80%",
                          }}
                        >
                          {category}
                        </span>
                      ))}
                    </Stack>
                  ) : null}
                  {filters.sizes.length ? (
                    <Stack
                      direction="horizental"
                      spacing="tight"
                      align="center"
                    >
                      <Heading
                        as="h5"
                        style={{ color: "var(--color-grey-100)" }}
                      >
                        Dimenisions:
                      </Heading>
                      {filters.sizes.map((size) => (
                        <span
                          key={size}
                          style={{
                            color: "var(--color-grey-700)",
                            backgroundColor: "var(--color-grey-100)",
                            borderRadius: "5px",
                            padding: "0.2rem",
                            fontSize: "80%",
                          }}
                        >
                          {size}
                        </span>
                      ))}
                    </Stack>
                  ) : null}
                  {filters.price ? (
                    <Stack
                      direction="horizental"
                      spacing="tight"
                      align="center"
                    >
                      <Heading
                        as="h5"
                        style={{ color: "var(--color-grey-100)" }}
                      >
                        Price:
                      </Heading>
                      <span
                        style={{
                          color: "var(--color-grey-700)",
                          backgroundColor: "var(--color-grey-100)",
                          borderRadius: "5px",
                          padding: "0.2rem",
                          fontSize: "80%",
                        }}
                      >
                        Less Than {filters.price}
                      </span>
                    </Stack>
                  ) : null}
                  {filters.availability ? (
                    <Stack
                      direction="horizental"
                      spacing="tight"
                      align="center"
                    >
                      <Heading
                        as="h5"
                        style={{ color: "var(--color-grey-100)" }}
                      >
                        Availability:
                      </Heading>
                      <span
                        style={{
                          color: "var(--color-grey-700)",
                          backgroundColor: "var(--color-grey-100)",
                          borderRadius: "5px",
                          padding: "0.2rem",
                          fontSize: "80%",
                        }}
                      >
                        {filters.availability}
                      </span>
                    </Stack>
                  ) : null}
                </div>
              ) : (
                <Heading
                  as="h5"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-100)",
                    borderRadius: "5px",
                    padding: "0.2rem",
                    fontSize: "80%",
                  }}
                >
                  All
                </Heading>
              )}
            </div>
            <StyledArtworksContainer>
              {filteredImages.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-beige-900)",
                    textTransform: "uppercase",
                    letterSpacing: "1.3px",
                  }}
                >
                  There are No Pictures match the filters you are applying !
                </p>
              ) : null}
              {allImagesIsError ? (
                <Error message={allImagesError}></Error>
              ) : null}
              {filteredPicturesIsError ? (
                <Error message={filteredPicturesError}></Error>
              ) : null}
              {filteredImages?.map((picture) => (
                <ArtworkCard key={picture.id} picture={picture} />
              ))}
            </StyledArtworksContainer>
          </>
        )}
      </PageContentContainer>
    </div>
  );
}
