import { Link } from "react-router-dom";
import SubHeading from "./styledSubHeading";
import styled from "styled-components";

import { TbPhotoEdit, TbPhotoX, TbPhotoUp } from "react-icons/tb";
import Stack from "./stack";
import Button from "./button";

const StyledAdminSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  margin-bottom: 2rem;
`;
export default function SuperUserSection() {
  return (
    <StyledAdminSection>
      <SubHeading textsize="1.5rem" textalign="start">
        As An Owner Of this Web Application You Can
      </SubHeading>
      <Stack direction="horizental">
        <div style={{ minWidth: "3.2rem" }}>
          <TbPhotoEdit
            style={{
              width: "3.2rem",
              height: "3.2rem",
              color: "var(--color-beige-700)",
            }}
          />
        </div>
        <p
          style={{
            color: "var(--color-beige-700)",
            textTransform: "capitalize",
            fontWeight: "600",
            letterSpacing: "1.1px",
          }}
        >
          Upload New Artworks
        </p>
      </Stack>
      <Stack direction="horizental">
        <div style={{ minWidth: "3rem" }}>
          <TbPhotoUp
            style={{
              width: "3rem",
              height: "3rem",
              color: "var(--color-beige-700)",
            }}
          />
        </div>
        <p
          style={{
            color: "var(--color-beige-700)",
            textTransform: "capitalize",
            fontWeight: "600",
            letterSpacing: "1.1px",
          }}
        >
          Edit Information of Existing Artworks
        </p>
      </Stack>
      <Stack direction="horizental">
        <div style={{ minWidth: "3rem" }}>
          <TbPhotoX
            style={{
              width: "3rem",
              height: "3rem",
              color: "var(--color-beige-700)",
            }}
          />
        </div>
        <p
          style={{
            color: "var(--color-beige-700)",
            textTransform: "capitalize",
            fontWeight: "600",
            letterSpacing: "1.1px",
          }}
        >
          Remove Artworks out of Your Store
        </p>
      </Stack>

      <Link to="/admin/dashboard">
        <Button
          style={{
            marginLeft: "unset",
            marginRight: "unset",
            width: "100%",
            borderRadius: "0",
          }}
        >
          Manage Store Content
        </Button>
      </Link>
    </StyledAdminSection>
  );
}
