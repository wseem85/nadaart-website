// import styled, { keyframes } from "styled-components";

// const rotate = keyframes`
//   to {
//     transform: rotate(1turn)
//   }
// `;
// const StyledSpinner = styled.div`
//   /* margin: 4.8rem auto; */

//   width: 6.4rem;
//   aspect-ratio: 1;
//   border-radius: 50%;
//   background: radial-gradient(farthest-side, var(--color-brand-700) 90%, #0000)
//       top/8px 8px no-repeat,
//     conic-gradient(#0000 10%, var(--color-brand-700));
//   -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
//   animation: ${rotate} 1.5s infinite linear;
// `;

// export default function Spinner() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <StyledSpinner />
//     </div>
//   );
// }

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
