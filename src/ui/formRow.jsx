import PropTypes from "prop-types";
import styled from "styled-components";

const StyledFormRowRegular = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  position: relative;

  @media screen and (min-width: 500px) {
    flex-direction: row;
  }

  gap: 0.7rem;
  width: 100%;
  & input[type="file"] {
    background-color: transparent;
    box-shadow: none;
    border-bottom: none;
    width: 220px;
    @media screen and (min-width: 300px) {
      width: 250px;
    }
    @media screen and (min-width: 350px) {
      width: 100%;
    }
  }

  & > button {
    justify-self: flex-end;

    margin-top: 2rem;
  }
`;

const Label = styled.label`
  display: flex;
  color: var(--color-grey-600);

  @media screen and (min-width: 640px) {
    align-self: center;
  }
  font-weight: 500;
`;

const Error = styled.span`
  line-height: 1;
  font-size: 1.4rem;
  position: absolute;
  bottom: -7px;

  height: 18px;
  color: ${(props) =>
    props.$errorColor ? props.$errorColor : " var(--color-red-700)"};

  min-width: 100%;
  @media screen and (min-width: 500px) {
    left: ${(props) => (props.$spaceLeft ? props.$spaceLeft : "unset")};
    padding-left: 5px;
  }
`;

function FormRow({ label, labelWidth, error, errorColor, children }) {
  return (
    <StyledFormRowRegular>
      {label && (
        <Label htmlFor={children.props.id} style={{ minWidth: labelWidth }}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <Error $errorColor={errorColor} $spaceLeft={labelWidth}>
          {error}
        </Error>
      )}
    </StyledFormRowRegular>
    // </div>
  );
}

export default FormRow;

FormRow.propTypes = {
  label: PropTypes.any,
  labelWidth: PropTypes.string,
  error: PropTypes.string,
  errorColor: PropTypes.string,
  children: PropTypes.object || PropTypes.array,
};
