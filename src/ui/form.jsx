import styled, { css } from "styled-components";

const Form = styled.form`
  font-size: 80%;
  padding: 2.5rem 2rem;
  background-color: var(--color-beige-300);
  border: 1px solid var(--color-beige-500);
  width: 100%;
  max-width: 800px;
  display: grid;
  gap: 1.7rem;

  @media screen and (min-width: 350px) {
    font-size: 90%;
  }
  @media screen and (min-width: 550px) {
    font-size: 100%;
    padding: 3rem;
  }
  @media screen and (min-width: 991px) {
    row-gap: 1.7rem;
    grid-template-columns: 1fr 1fr;
    column-gap: 7rem;
  }
  & * {
    font-size: inherit;
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2rem 1.3rem;

      background-color: var(--color-grey-0);

      @media screen and (min-width: 768px) {
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      @media screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;

        column-gap: 3rem;
      }
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
