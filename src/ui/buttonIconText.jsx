import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButtonIconText = styled.button`
  display: flex;
  align-items: center;
  line-height: 1.7rem;
  gap: 0.5rem;
  justify-content: center;
  background: transparent;
  border: 1px solid;
  border-color: ${(props) =>
    props.color ? props.color : "var(--color-brand-300)"};
  position: relative;
  padding: 0.3rem 0.4rem;
  border-radius: var(--border-radius-sm);
  color: ${(props) =>
    props.textcolor ? props.textcolor : "var(--color-brand-700)"};
  transition: all 0.3s;
  font-size: 80%;
  min-width: 70px;
  @media screen and (min-width: 550px) {
    min-width: 100px;
  }
  width: fit-content;
  opacity: 0.9;

  /* box-shadow: var(--shadow-sm); */
  &:focus,
  &:hover {
    opacity: 1;
    outline: none;
    box-shadow: var(--shadow-sm);
  }
  @media screen and (min-width: 550px) {
    font-size: 100%;
    line-height: 2.3rem;
    padding: 0.5rem 0.8rem;
  }

  & svg {
    width: 1.7rem;
    height: 1.7rem;
    color: ${(props) =>
      props.textcolor ? props.textcolor : "var(--color-brand-700)"};
    transition: 0.3s;
    @media screen and (min-width: 550px) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  & > span {
    font-weight: bold;
    color: ${(props) =>
      props.textcolor ? props.textcolor : "var(--color-brand-700)"};
  }
`;

export default function ButtonIconText({
  children,
  color,
  textcolor,
  handler,
}) {
  return (
    <StyledButtonIconText color={color} textcolor={textcolor} onClick={handler}>
      {children}
    </StyledButtonIconText>
  );
}

ButtonIconText.propTypes = {
  children: PropTypes.array || PropTypes.object,
  color: PropTypes.string,
  textcolor: PropTypes.string,
  handler: PropTypes.func,
};
