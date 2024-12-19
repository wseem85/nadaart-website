import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSubHeading = styled.h3`
  color: var(--color-grey-500);
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  /* margin-right: auto; */
  /* text-align: center; */
  font-size: 1.7rem;
  /* margin-left: auto; */
  /* margin-right: auto; */
  margin-top: 2rem;
  margin-bottom: 1 rem;
  font-size: ${(props) => props.textsize};
  text-align: ${(props) => props.textalign};
  color: ${(props) => props.color};
  min-width: ${(props) => props.minwidth};
`;
export default function SubHeading({
  textsize = "1.7rem",
  textalign = "center",
  children,
  color = "color-grey-500",
  minwidth = "100%",
}) {
  return (
    <StyledSubHeading
      textize={textsize}
      textalign={textalign}
      color={color}
      minwidth={minwidth}
    >
      {children}
    </StyledSubHeading>
  );
}

SubHeading.propTypes = {
  textsize: PropTypes.string,
  textalign: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  color: PropTypes.string,
  minwidth: PropTypes.string,
};
