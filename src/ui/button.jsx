import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.2rem 0.6rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    /* font-size: 1.4rem; */
    padding: 0.6rem 1rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1rem 1.3rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    min-width: 70px;
    @media screen and (min-width: 550px) {
      min-width: 100px;
    }
    background-color: var(--color-brand-700);
    color: var(--color-grey-50);
    border: 1px solid var(--color-grey-500);

    &:hover {
      background-color: var(--color-brand-500);
    }
  `,
  secondary: css`
    color: var(--color-grey-500);
    background-color: transparent;
    border: 2px solid var(--color-grey-200);
    box-shadow: none;
    min-width: 70px;
    @media screen and (min-width: 550px) {
      min-width: 100px;
    }
    &:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--color-grey-500);
    }
  `,
  outlined: css`
    color: var(--color-brand-700);
    background-color: transparent;
    border: 1px solid var(--color-brand-700);
    box-shadow: none;

    &:hover {
      box-shadow: var(--shadow-sm);
    }
  `,
  plainlink: css`
    color: var(--color-brand-500);
    background-color: transparent;
    border: none;
    min-width: unset;
    transition: all 0.3s;
    border-radius: 0;
    box-shadow: none;
    padding: unset;
    @media screen and (min-width: 550px) {
      min-width: unset;
    }
    border-bottom: 1px solid var(--color-brand-300);

    &:hover {
      color: var(--color-brand-700);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  height: ${(props) => props.$height || "unset"};
  width: ${(props) => props.$width || "unset"};

  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
