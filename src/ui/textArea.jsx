import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;

  flex-grow: 1;

  height: 8rem;

  background-color: #fff;
  border: none;
  border-radius: 0;
  padding: 0.7rem 0.4rem;
  border-bottom: 1px solid var(--color-beige-500);
  box-shadow: var(--shadow-sm);
  max-width: 100%;
  min-width: 100px;
  width: 220px;
  @media screen and (min-width: 320px) {
    width: 100%;
  }
  min-height: 14rem;
  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid var(--color-beige-700);
  }
`;

export default Textarea;
