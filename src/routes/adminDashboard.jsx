import { useQuery } from "@tanstack/react-query";
import { getPictures } from "../services/apiPictures";
import SectionHeading from "../ui/sectionHeading";
import Loading from "../ui/loading";
import styled from "styled-components";
import PageContentContainer from "../ui/StyledPageContentContainer";

import ArtworkDashboardRow from "../ui/artworkDashboardRow";
import Button from "../ui/button";

import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import Spinner from "../ui/spinner";
import Error from "../ui/error";
import useWindowWidth from "../hooks/useWindowWidth";
import SubHeading from "../ui/styledSubHeading";
import { useState } from "react";
import Stack from "../ui/stack";
const StyledProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-beige-100);
  width: 100%;
  gap: 0;
  max-width: 1000px;

  & > div:nth-child(even) {
    background-color: var(--color-beige-400);
  }
  & > div:nth-child(odd) {
    background-color: var(--color-beige-300);
  }
`;
const StyledProductsHeading = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  @media screen and (min-width: 1024) {
  }
  justify-content: space-between;
`;
export default function AdminDashboard() {
  const [optionsMenuOpen, setOptionMenuOpen] = useState(false);
  const [openedMenuId, setOpenedMenuId] = useState(null);
  const {
    isPending,
    fetchStatus: userFetchStatus,

    isAdmin,
  } = useCurrentUser();

  const {
    data: pictures,
    fetchStatus,
    isPending: isPendingAllImages,
    error: allImagesError,
    isError: allImagesIsError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getPictures,
    enabled: isAdmin,
  });

  const { windowWidth } = useWindowWidth();

  if (isPending || userFetchStatus === "fetching") return <Spinner />;

  return (
    <PageContentContainer>
      <SectionHeading>Dashboard</SectionHeading>
      <Link to="upload/new">
        <Button
          style={{
            width: "100%",
            borderRadius: "0",
            marginBottom: "2rem",
            maxWidth: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          size="large"
          variation="primary"
        >
          Upload New Pictures
        </Button>
      </Link>
      {allImagesError ? <Error message={allImagesIsError.message} /> : null}
      {!allImagesIsError &&
      (isPendingAllImages || fetchStatus === "fetching") ? (
        <Loading />
      ) : (
        <Stack direction="vertical" align="center" spacing="none">
          <SubHeading color="var(--color-brand-700)" textalign="center">
            Manage Products
          </SubHeading>

          <StyledProductsHeading
            style={{
              backgroundColor: "var(--color-beige-500)",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <h5 style={{ width: "60px" }}>#PIC</h5>
            <h5 style={{ width: "44.5px" }}>PRICE</h5>
            {windowWidth > 700 ? <h5>Category</h5> : null}

            {windowWidth > 900 ? <h5>Diminitions</h5> : null}
            {windowWidth > 460 ? <h5>Discount</h5> : null}
            {windowWidth > 570 ? <h5>Availability</h5> : null}
            <h5 style={{ width: windowWidth < 550 ? "80px" : "100px" }}>
              Actions
            </h5>
          </StyledProductsHeading>
          <StyledProductsContainer>
            {pictures.map((picture) => (
              <ArtworkDashboardRow
                key={picture.id}
                picture={picture}
                optionsMenuOpen={optionsMenuOpen}
                setOptionMenuOpen={setOptionMenuOpen}
                openedMenuId={openedMenuId}
                setOpenedMenuId={setOpenedMenuId}
              />
            ))}
          </StyledProductsContainer>
        </Stack>
      )}
    </PageContentContainer>
  );
}
