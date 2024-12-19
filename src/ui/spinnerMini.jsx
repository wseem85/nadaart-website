import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 1.7rem;
  height: 1.7rem;
  @media screen and (min-width: 550px) {
    width: 2.4rem;
    height: 2.4rem;
  }
  color: ${(props) => props.$color || "var(--color-brand-700)"};
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
