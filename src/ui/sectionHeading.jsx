import styled from "styled-components";
import Heading from "./heading";
import Paragraph from "./paragraph";
import PropTypes from "prop-types";
const StyledSectionHeading = styled(Heading)`
  position: relative;
  text-transform: uppercase;
  letter-spacing: var(--letter-space-lg);
  line-height: var(--line-md);
  color: var(--color-brand-700);
  font-weight: bold;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
  margin-bottom: 1rem;
  width: 220px;
  padding-left: 1rem;
  padding-right: 1rem;
  &:hover {
    color: var(--color-brand-700);
  }
  &::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 100%;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-beige-500);
    transition: width 0.3s;
  }
  &::before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 100%;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-beige-500);
    transition: width 0.3s;
  }
`;
export default function SectionHeading({
  children,
  paragraphContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur labore ab.",
}) {
  return (
    <div>
      <StyledSectionHeading as="h3">{children}</StyledSectionHeading>
      <Paragraph style={{ marginBottom: "3rem" }}>{paragraphContent}</Paragraph>
    </div>
  );
}
SectionHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  paragraphContent: PropTypes.string,
};
