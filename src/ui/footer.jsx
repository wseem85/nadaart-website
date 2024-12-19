import styled from "styled-components";

import Heading from "./heading";
import { StyledLogo } from "./header";
const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0.6rem;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    width: unset;
  }
`;
const StyledFooter = styled.footer`
  background-color: var(--color-beige-300);
  color: var(--color-grey-700);
  padding: 3rem 2.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.7rem;

  top: 4rem;
`;
const IconsContainer = styled.div`
  flex: 1;
  display: grid;
  max-width: 25rem;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
`;
const IconTooltip = styled.span`
  position: absolute;
  width: 10rem;
  /* padding: 0.3rem 0.3rem; */
  text-align: center;
  color: var(--color-grey-100);
  transition: all 0.3 ease;
  font-size: 1rem;
  top: -0.5rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  text-transform: capitalize;
  visibility: hidden;
`;
const IconContainer = styled.div`
  cursor: pointer;

  position: relative;
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover > ${IconTooltip} {
    visibility: visible;
  }
`;
const IconImg = styled.img`
  max-width: 100%;
  width: 100%;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterRow type="horizontal" style={{ justifyContent: "center" }}>
        <Heading as="h3" style={{ textAlign: "center" }}>
          {" "}
          We Accept
        </Heading>
        <IconsContainer>
          <IconContainer>
            <IconImg src="logos/mastercard.svg" />
            <IconTooltip>Master card</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/visa.svg" />
            <IconTooltip>Visa card</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/americanexpress.svg" />
            <IconTooltip style={{ top: "-1.3rem" }}>
              American Express
            </IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/applepay.svg" />
            <IconTooltip>Apple pay</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/shoppay.svg" />
            <IconTooltip>Shop Pay</IconTooltip>
          </IconContainer>
          <IconContainer>
            <IconImg src="logos/googlepay.svg" />
            <IconTooltip>google pay</IconTooltip>
          </IconContainer>
        </IconsContainer>
      </FooterRow>
      <FooterRow
        type="horizontal"
        style={{
          alignItems: "center",
          justifyContent: "center",

          flexWrap: "wrap",
        }}
      >
        <StyledLogo>Nada Art</StyledLogo>
        <span>🤍</span>
        <div>All Rights Reserved &copy; 2024</div>
      </FooterRow>
    </StyledFooter>
  );
}
