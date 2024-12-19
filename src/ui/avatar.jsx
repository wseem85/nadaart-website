import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Avatar({
  img,
  imgWidth = "22px",
  containerWidth = "30px",
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/user")}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        padding: "0.5rem",
        width: containerWidth,
        height: containerWidth,
        backgroundColor: "var(--color-grey-200)",
      }}
    >
      <img
        style={{
          width: imgWidth,
          height: imgWidth,
          borderRadius: "50%",
        }}
        src={img}
        alt="avatar"
      />
    </div>
  );
}

Avatar.propTypes = {
  img: PropTypes.string,
  imgWidth: PropTypes.string,
  containerWidth: PropTypes.string,
};
