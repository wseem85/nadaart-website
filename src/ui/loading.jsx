import styled from "styled-components";

const StyledLoadingContainer = styled.div`
  display: flex;
  gap: 4px;
  min-height: 48px;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
const StyledPulsedCircle = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--color-brand-300);
  @media screen and (min-width: 640px) {
    width: 1.5rem;
    height: 1.5rem;
    transition: opacity 0.3s;
  }
`;

export default function Loading() {
  return (
    <StyledLoadingContainer>
      {[0, 1, 2].map((el) => (
        <StyledPulsedCircle
          key={el}
          className={
            el === 1
              ? " animate-pulse2 "
              : el === 2
              ? " animate-pulse4"
              : " animate-pulse "
          }
        ></StyledPulsedCircle>
      ))}
    </StyledLoadingContainer>
  );
}
