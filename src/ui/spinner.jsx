
import styled, { keyframes } from "styled-components";

import { ImSpinner2 } from "react-icons/im";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled(ImSpinner2)`
  width: 6rem;
  height: 6rem;
  @media screen and (min-width: 550px) {
    width: 8rem;
    height: 8rem;
  }
  color: ${(props) => props.$color || "var(--color-brand-700)"};
  animation: ${rotate} 1.5s infinite linear;
`;
const SpinnerContainer = styled.div`
  min-height: calc(100vh - 65px);
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  );
}
