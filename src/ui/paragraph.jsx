import PropTypes from "prop-types";
import styled from "styled-components";

const StyledParagraph = styled.p`
  line-height: 1.4;
  text-align: left;
  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  @media screen and (min-width: 500px) {
    text-align: center;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }
  color: var(--color-grey-500);
  &::first-letter {
    font-weight: bold;

    color: var(--color-brand-300);
  }
`;

export default function Paragraph({ align = "center", color, children }) {
  return (
    <StyledParagraph style={{ color: color, textAlign: align }}>
      {children}
    </StyledParagraph>
  );
}

Paragraph.propTypes = {
  align: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};
