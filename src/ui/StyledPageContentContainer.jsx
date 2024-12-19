import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContentContainer = styled.div`
  min-height: calc(100vh - 65px);
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || "flex-start"};
  max-width: ${(props) => props.maxwidth || "unset"};
  margin-left: ${(props) => props.maxwidth && "auto"};
  margin-right: ${(props) => props.maxwidth && "auto"};
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 640px) {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-left: ${(props) => props.maxwidth && "auto"};
    margin-right: ${(props) => props.maxwidth && "auto"};
  }
  @media screen and (min-width: 1200px) {
    margin-left: 4rem;
    margin-right: 4rem;
    margin-left: ${(props) => props.maxwidth && "auto"};
    margin-right: ${(props) => props.maxwidth && "auto"};
  }
`;
export default function PageContentContainer({ justify, maxwidth, children }) {
  return (
    <StyledContentContainer justify={justify} maxwidth={maxwidth}>
      {children}
    </StyledContentContainer>
  );
}

PageContentContainer.propTypes = {
  justify: PropTypes.string,
  maxwidth: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
