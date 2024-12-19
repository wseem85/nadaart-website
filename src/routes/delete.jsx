import { useNavigate, useParams } from "react-router-dom";
import { getPicture } from "../services/apiPictures";
import Spinner from "../ui/spinner";
import styled from "styled-components";
import Button from "../ui/button";
import useDeletePicture from "../hooks/useDeletePicture";
import { useQuery } from "@tanstack/react-query";
import PageContentContainer from "../ui/StyledPageContentContainer";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect } from "react";
import Heading from "../ui/heading";
import Stack from "../ui/stack";
import useWindowWidth from "../hooks/useWindowWidth";
import SectionHeading from "../ui/sectionHeading";
import Error from "../ui/error";
import SpinnerMini from "../ui/spinnerMini";
const StyledDeleteContent = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  background-color: #fff;
  padding: 2rem 2.3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--color-red-700);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  background-color: var(--color-beige-300);
  box-shadow: var(--shadow-sm);
  gap: 1.3rem;
  & > div {
    display: flex;
    gap: 2rem;
  }
`;
export default function Delete() {
  const { id } = useParams();

  const { windowWidth } = useWindowWidth();
  const navigate = useNavigate();
  const { isDeleting, deletePicture } = useDeletePicture();
  const { isAdmin } = useCurrentUser();
  const {
    data: picture,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPicture(id),
    enabled: isAdmin,
  });
  useEffect(
    function () {
      if (!isAdmin) navigate("/login");
    },
    [isAdmin, navigate]
  );
  if (isPending) return <Spinner />;
  return (
    <PageContentContainer>
      <SectionHeading>Delete Picture</SectionHeading>

      {isError ? <Error message={error.message}></Error> : null}
      {!isError ? (
        <Stack
          justify="center"
          align="center"
          direction={windowWidth <= 640 ? "vertical" : "horizental"}
        >
          <h4
            style={{
              color: "var(--color-grey-500)",
              lineHeight: "1.5",
              textTransform: "uppercase",
              letterSpacing: "1.3px",
            }}
          >
            {picture.title}
          </h4>
          <img
            src={picture.src}
            style={{
              height: "100px",
              border: "1px solid var(--color-grey-400)",
              padding: "0.3rem",
            }}
          />
        </Stack>
      ) : null}
      {!isError ? (
        <StyledDeleteContent>
          <Heading as="h4" style={{ fontWeight: "bold" }}>
            🔴 Are You Sure ? this will delete ({" "}
            <span style={{ color: "var(--color-beige-900)" }}>
              {picture.title}
            </span>
            ) picture from store completely .
          </Heading>
          <div>
            <Button
              disabled={isDeleting}
              variation="outlined"
              onClick={() => navigate(-1)}
              style={{ color: "var(--color-grey-700)" }}
            >
              Cancel
            </Button>
            <Button
              variation="danger"
              disabled={isDeleting}
              $height={windowWidth < 600 ? "unset" : "45px"}
              $width="100px"
              onClick={() => {
                deletePicture(picture.id);
              }}
            >
              {isDeleting ? <SpinnerMini $color="#fff" /> : "Delete"}
            </Button>
          </div>
        </StyledDeleteContent>
      ) : null}
    </PageContentContainer>
  );
}
