import PropTypes from "prop-types";
import Heading from "./heading";

import Stack from "./stack";

export default function Error({ message }) {
  return (
    <Stack direction="vertical" spacing="wide" justify="center" align="center">
      <Heading as="h3" style={{ textAlign: "center" }}>
        Soory , Something went wrong
      </Heading>
      <p style={{ color: "var(--color-red-700)", textAlign: "center" }}>
        {" "}
        {message}
      </p>
    </Stack>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};
