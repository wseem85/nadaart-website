import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: #fff;
  width: 220px;
  @media screen and (min-width: 300px) {
    width: 250px;
  }
  @media screen and (min-width: 350px) {
    width: 100%;
  }
  @media screen and (min-width: 550px) {
    padding: 0.7rem 1.3rem;
  }
  flex-grow: 1;

  border: none;
  border-radius: 0;
  padding: 0.7rem 0.4rem;
  border-bottom: 1px solid var(--color-beige-500);
  box-shadow: var(--shadow-sm);

  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid var(--color-beige-700);
  }
`;

export default Input;
