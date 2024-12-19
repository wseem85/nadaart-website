import { MdArrowDropDown, MdClose, MdDelete, MdEdit } from "react-icons/md";
import styled from "styled-components";
import ButtonIconText from "./buttonIconText";

import { NavLink } from "react-router-dom";
import useWindowWidth from "../hooks/useWindowWidth";
import PropTypes from "prop-types";

const StyledArtworkBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 130px;
  padding: 0.5rem 1rem;

  justify-content: center;

  justify-content: space-between;
  & > img {
    width: 70px;
    height: 85px;
    aspect-ratio: 5/6;
    align-self: center;
  }
  & > div {
    display: flex;
    align-items: center;
  }
  & > div.actions {
    position: relative;
    width: 100px;
  }
  & > h4 {
    display: flex;
    align-items: center;
    color: var(--color-grey-600);
  }
  & button {
    border: none;
    box-shadow: none;
    font-size: 80%;
    /* width: 80px; */
    line-height: 1.7rem;
    padding: 0.3rem 0.4rem;
    &:focus,
    &:hover {
      box-shadow: none;
    }
    & > svg {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`;
const StyledMenus = styled.ul`
  position: absolute;

  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-grey-300);
  & button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: none;
    box-shadow: none;
    & svg {
      width: 1.7rem;
      height: 1.7rem;
    }
    @media screen and (min-width: 550px) {
      font-size: 80%;
      line-height: 1.7rem;
      padding: 0.3rem 0.4rem;
    }
  }
`;

export default function ArtworkDashboardRow({
  picture,
  optionsMenuOpen,
  setOptionMenuOpen,
  openedMenuId,
  setOpenedMenuId,
}) {
  const { windowWidth } = useWindowWidth();
  const { id, title, src, price, discount, soldOut, category, dimenitions } =
    picture;
  return (
    <StyledArtworkBox>
      <img src={src} alt={`Img-of-${title}`} />
      <h4>${price}</h4>
      {windowWidth > 700 ? <div>{category}</div> : null}

      {windowWidth > 900 ? (
        <div style={{ width: "72.28px" }}>{dimenitions}</div>
      ) : null}
      {windowWidth > 460 ? (
        <div style={{ width: "56px" }}>{discount}%</div>
      ) : null}
      {windowWidth > 570 ? (
        <div style={{ width: "67px" }}>{soldOut ? "solded" : "available"}</div>
      ) : null}
      <div className="actions">
        <StyledMenus>
          <>
            {openedMenuId !== id ? (
              <ButtonIconText
                color="var(--color-grey-700)"
                textcolor="var(--color-grey-700)"
                handler={() => {
                  setOptionMenuOpen(true);
                  setOpenedMenuId(id);
                }}
              >
                <span>Options</span>
                <MdArrowDropDown />
              </ButtonIconText>
            ) : (
              <>
                <ButtonIconText
                  color="var(--color-grey-700)"
                  textcolor="var(--color-grey-700)"
                  handler={() => {
                    setOptionMenuOpen(false);
                    setOpenedMenuId(null);
                  }}
                >
                  <span>Close</span>
                  <MdClose style={{}} />
                </ButtonIconText>
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "var(--color-grey-300)",
                    marginTop: "0.3rem",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </>
            )}
            {openedMenuId === id ? (
              <>
                <li style={{ marginBottom: "0.5rem" }}>
                  <NavLink to={`edit/${picture.id}`}>
                    <ButtonIconText
                      color="var(--color-green-900)"
                      textcolor="var(--color-green-900)"
                    >
                      <span>Edit</span> <MdEdit />
                    </ButtonIconText>
                  </NavLink>
                </li>
                <li style={{ paddingBottom: "0.5rem" }}>
                  <NavLink to={`delete/${picture.id}`}>
                    <ButtonIconText
                      color="var(--color-red-700)"
                      textcolor="var(--color-red-700)"
                    >
                      <span>Delete</span> <MdDelete />
                    </ButtonIconText>
                  </NavLink>
                </li>
              </>
            ) : null}
          </>
        </StyledMenus>
      </div>
    </StyledArtworkBox>
  );
}
ArtworkDashboardRow.propTypes = {
  picture: PropTypes.object,
  optionsMenuOpen: PropTypes.bool,
  setOptionMenuOpen: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  dimenitions: PropTypes.string,
  soldOut: PropTypes.bool,
  price: PropTypes.number,
  src: PropTypes.string,
  category: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  discount: PropTypes.string,
  description: PropTypes.string,
};
