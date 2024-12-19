import PropTypes from "prop-types";
import styled from "styled-components";

const StyledStack = styled.div`
  display: flex;
  min-width: ${(props) => props.minwidth};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderradius};
  flex-grow: ${(props) => props.grow};
  background-color: ${(props) => props.bgcolor};
  padding: ${(props) => `${props.paddingy} ${props.paddingx}`};
  gap: ${(props) =>
    props.spacing === "none"
      ? "0rem"
      : props.spacing === "narrow"
      ? "1rem"
      : props.spacing === "wide"
      ? "1.5rem"
      : props.spacing === "wider"
      ? "2rem"
      : props.spacing === "widest"
      ? "3rem"
      : props.spacing === "extremelyWide"
      ? "5rem"
      : "1rem"};
  flex-direction: ${(props) =>
    props.direction === "vertical"
      ? "column"
      : props.direction === "rowReverse"
      ? "row-reverse"
      : props.direction === "columnReverse"
      ? "column-reverse"
      : "row"};
  justify-content: ${(props) =>
    props.justify === "start"
      ? "flex-start"
      : props.justify === "between"
      ? "space-between"
      : props.justify === "around"
      ? "space-around"
      : props.justify === "center"
      ? "center"
      : "flex-end"};
  align-items: ${(props) =>
    props.align === "start"
      ? "flex-start"
      : props.align === "between"
      ? "space-between"
      : props.align === "around"
      ? "space-around"
      : props.align === "center"
      ? "center"
      : "flex-end"};
`;
export default function Stack({
  direction = "vertical",
  spacing = "tight",
  justify = "start",
  align = "start",
  children,
  minwidth = "unset",
  grow = "0",
  bgcolor = "transparent",
  paddingy = "0",
  paddingx = "0",
  height = "unset",
  borderradius = "0",
}) {
  return (
    <StyledStack
      direction={direction}
      spacing={spacing}
      justify={justify}
      align={align}
      grow={grow}
      minwidth={minwidth}
      bgcolor={bgcolor}
      paddingx={paddingx}
      paddingy={paddingy}
      height={height}
      borderradius={borderradius}
    >
      {children}
    </StyledStack>
  );
}

Stack.propTypes = {
  direction: PropTypes.string,
  spacing: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  minwidth: PropTypes.string,
  grow: PropTypes.string,
  bgcolor: PropTypes.string,
  paddingy: PropTypes.string,
  paddingx: PropTypes.string,
  height: PropTypes.string,
  borderradius: PropTypes.string,
};
