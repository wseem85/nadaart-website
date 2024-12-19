import PropTypes from "prop-types";
import { forwardRef } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 0.3rem 0.6rem;
  box-shadow: var(--shadow-sm);
  max-width: 8rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  @media screen and (min-width: 250px) {
    max-width: 12rem;
  }
  @media screen and (min-width: 350px) {
    max-width: unset;
  }
  @media screen and (min-width: 550px) {
    padding: 0.7rem 1.3rem;
  }
`;

const Select = forwardRef(({ name, onChange, options, dvalue }, ref) => {
  return (
    <StyledSelect
      defaultValue={dvalue}
      name={name}
      options={options}
      onChange={onChange}
      ref={ref}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
});

Select.displayName = "SElect";
export default Select;

Select.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  dvalue: PropTypes.string,
  options: PropTypes.array,
};
