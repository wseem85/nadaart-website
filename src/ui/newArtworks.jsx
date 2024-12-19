import SectionHeading from "./sectionHeading";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewArtworkCard from "./newArtworkCard";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PropTypes from "prop-types";
const Container = styled.div`
  display: grid;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media screen and (min-width: 992px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  @media screen and (min-width: 1124px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  place-items: center;
  justify-items: center;
  column-gap: 2rem;
  row-gap: 2.7rem;

  @media screen and (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media screen and (min-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1250px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const StyledLink = styled(Link)`
  border-bottom: 1px solid var(--color-brand-midTransparency);
  color: var(--color-brand-300);
  transition: 0.3s;
  display: flex;
  gap: 1rem;
  align-items: center;
  &:hover {
    border-color: var(--color-brand-700);
    color: var(--color-brand-700);
  }
  & svg {
    position: relative;
  }
  &:hover svg {
    animation: shake 0.3s alternate infinite;
  }
`;
export default function NewArtWorks({ newPictures }) {
  return (
    <section
      style={{
        marginBottom: "2.3rem",
        borderBottom: "1px solid var(--color-beige-500)",
        paddingBottom: "6rem",
      }}
    >
      <SectionHeading>New Artworks</SectionHeading>

      <Container>
        {newPictures.map((picture) => (
          <NewArtworkCard key={picture.id} picture={picture} />
        ))}
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "var(--shadow-md)",
            minHeight: "350px",
            minWidth: "250px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            justifySelf: "stretch",
          }}
        >
          <h4
            style={{ color: "var(--color-brand-700)", letterSpacing: "1.2px" }}
          >
            Wanna See All Products
          </h4>
          <StyledLink to="/artworks">
            Explore All <MdKeyboardDoubleArrowRight />
          </StyledLink>
        </div>
      </Container>
    </section>
  );
}

NewArtWorks.propTypes = {
  newPictures: PropTypes.array,
};
